import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import EventIcon from "@mui/icons-material/Event";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

import { auth } from "../services/firebase";
import { getFoodWaste } from "../services/foodWaste";

function FoodWasteSummary({
  refreshTrigger = 0,
}) {
  const [wasteItems, setWasteItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFoodWaste() {
      const user = auth.currentUser;

      if (!user) {
        setError(
          "You must be signed in to view food waste summary."
        );
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const records = await getFoodWaste(
          user.uid
        );

        setWasteItems(records);
      } catch (error) {
        console.error(
          "Failed to load food waste summary:",
          error
        );

        setError(
          "Unable to load food waste summary."
        );
      } finally {
        setLoading(false);
      }
    }

    loadFoodWaste();
  }, [refreshTrigger]);

  function getTimestampDate(timestamp) {
    if (
      timestamp &&
      typeof timestamp.toDate === "function"
    ) {
      return timestamp.toDate();
    }

    return null;
  }

  function formatWasteDate(timestamp) {
    const date = getTimestampDate(timestamp);

    if (!date) {
      return "Date unavailable";
    }

    return date.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function getMonthRange(offset = 0) {
    const now = new Date();

    return {
      start: new Date(
        now.getFullYear(),
        now.getMonth() + offset,
        1,
        0,
        0,
        0,
        0
      ),
      end: new Date(
        now.getFullYear(),
        now.getMonth() + offset + 1,
        0,
        23,
        59,
        59,
        999
      ),
    };
  }

  function isDateInRange(date, range) {
    if (!date) {
      return false;
    }

    return (
      date >= range.start &&
      date <= range.end
    );
  }

  const currentMonthRange = getMonthRange(0);
  const previousMonthRange = getMonthRange(-1);

  const currentMonthItems = wasteItems.filter(
    (item) =>
      isDateInRange(
        getTimestampDate(item.wastedAt),
        currentMonthRange
      )
  );

  const previousMonthItems = wasteItems.filter(
    (item) =>
      isDateInRange(
        getTimestampDate(item.wastedAt),
        previousMonthRange
      )
  );

  const totalWasteEvents = wasteItems.length;

  const totalUnitsWasted = wasteItems.reduce(
    (total, item) =>
      total + (Number(item.quantity) || 0),
    0
  );

  const currentMonthUnitsWasted =
    currentMonthItems.reduce(
      (total, item) =>
        total + (Number(item.quantity) || 0),
      0
    );

  const previousMonthUnitsWasted =
    previousMonthItems.reduce(
      (total, item) =>
        total + (Number(item.quantity) || 0),
      0
    );

  const categoryCounts = wasteItems.reduce(
    (counts, item) => {
      const category = item.category || "Other";

      counts[category] =
        (counts[category] || 0) + 1;

      return counts;
    },
    {}
  );

  const mostWastedCategory =
    Object.entries(categoryCounts).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || "None";

  const latestWaste =
    wasteItems.length > 0
      ? wasteItems[0]
      : null;

  function calculateChange(
    previousValue,
    currentValue
  ) {
    if (previousValue === 0) {
      if (currentValue === 0) {
        return 0;
      }

      return null;
    }

    return (
      ((previousValue - currentValue) /
        previousValue) *
      100
    );
  }

  const wasteEventChange = calculateChange(
    previousMonthItems.length,
    currentMonthItems.length
  );

  const unitsWastedChange = calculateChange(
    previousMonthUnitsWasted,
    currentMonthUnitsWasted
  );

  function renderChange(
    change,
    currentValue,
    previousValue
  ) {
    if (
      previousValue === 0 &&
      currentValue > 0
    ) {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            mt: 1,
          }}
        >
          <TrendingUpIcon
            color="error"
            fontSize="small"
          />

          <Typography
            variant="body2"
            color="error"
            fontWeight="bold"
          >
            Increased this month
          </Typography>
        </Box>
      );
    }

    if (
      previousValue === 0 &&
      currentValue === 0
    ) {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            mt: 1,
          }}
        >
          <TrendingFlatIcon
            color="action"
            fontSize="small"
          />

          <Typography
            variant="body2"
            color="text.secondary"
          >
            No change
          </Typography>
        </Box>
      );
    }

    if (change === null) {
      return null;
    }

    if (change > 0) {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            mt: 1,
          }}
        >
          <TrendingDownIcon
            color="success"
            fontSize="small"
          />

          <Typography
            variant="body2"
            color="success.main"
            fontWeight="bold"
          >
            {change.toFixed(1)}% reduction
          </Typography>
        </Box>
      );
    }

    if (change < 0) {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            mt: 1,
          }}
        >
          <TrendingUpIcon
            color="error"
            fontSize="small"
          />

          <Typography
            variant="body2"
            color="error"
            fontWeight="bold"
          >
            {Math.abs(change).toFixed(1)}% increase
          </Typography>
        </Box>
      );
    }

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          mt: 1,
        }}
      >
        <TrendingFlatIcon
          color="action"
          fontSize="small"
        />

        <Typography
          variant="body2"
          color="text.secondary"
        >
          No change
        </Typography>
      </Box>
    );
  }

  const currentMonthLabel =
    new Date().toLocaleDateString("en-CA", {
      month: "long",
      year: "numeric",
    });

  const previousMonthLabel =
    new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      1
    ).toLocaleDateString("en-CA", {
      month: "long",
      year: "numeric",
    });

  if (loading) {
    return (
      <Card
        elevation={3}
        sx={{
          mb: 4,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 3,
            }}
          >
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card
        elevation={3}
        sx={{
          mb: 4,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Alert severity="error">
            {error}
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      elevation={3}
      sx={{
        mb: 4,
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1,
          }}
        >
          <DeleteOutlineIcon color="error" />

          <Typography
            variant="h6"
            fontWeight="bold"
          >
            Food Waste Summary
          </Typography>
        </Box>

        <Typography
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          A quick overview of food that has
          been marked as wasted.
        </Typography>

        {wasteItems.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 3,
            }}
          >
            <Typography
              variant="h6"
              color="text.secondary"
            >
              No food waste recorded yet.
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              That's a great start!
            </Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(3, 1fr)",
                },
                gap: 2,
                mb: 3,
              }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "#ffebee",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <DeleteOutlineIcon color="error" />

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Waste Events
                  </Typography>
                </Box>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ mt: 1 }}
                >
                  {totalWasteEvents}
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "#fff8e1",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Inventory2Icon color="warning" />

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Units Wasted
                  </Typography>
                </Box>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ mt: 1 }}
                >
                  {totalUnitsWasted}
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "#e3f2fd",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <CategoryIcon color="primary" />

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Most Wasted Category
                  </Typography>
                </Box>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ mt: 1 }}
                >
                  {mostWastedCategory}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Typography
              variant="subtitle1"
              fontWeight="bold"
              sx={{ mb: 1 }}
            >
              Monthly Comparison
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Based on the date items were marked
              as wasted.
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                },
                gap: 2,
                mb: 3,
              }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "#f5f5f5",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {currentMonthLabel}
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ mt: 1 }}
                >
                  {currentMonthItems.length}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  waste events
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Units wasted:{" "}
                  {currentMonthUnitsWasted}
                </Typography>

                {renderChange(
                  wasteEventChange,
                  currentMonthItems.length,
                  previousMonthItems.length
                )}
              </Box>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "#f5f5f5",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {previousMonthLabel}
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ mt: 1 }}
                >
                  {previousMonthItems.length}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  waste events
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Units wasted:{" "}
                  {previousMonthUnitsWasted}
                </Typography>

                {renderChange(
                  unitsWastedChange,
                  currentMonthUnitsWasted,
                  previousMonthUnitsWasted
                )}
              </Box>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <EventIcon color="action" />

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Latest Waste
              </Typography>
            </Box>

            {latestWaste && (
              <Box sx={{ mt: 1 }}>
                <Typography fontWeight="bold">
                  {latestWaste.itemName ||
                    "Unknown Item"}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {latestWaste.category ||
                    "Other"}{" "}
                  • Quantity:{" "}
                  {latestWaste.quantity ?? 0}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Wasted:{" "}
                  {formatWasteDate(
                    latestWaste.wastedAt
                  )}
                </Typography>
              </Box>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default FoodWasteSummary;