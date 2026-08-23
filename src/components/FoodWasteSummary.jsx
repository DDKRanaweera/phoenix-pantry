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

  function formatWasteDate(timestamp) {
    if (!timestamp) {
      return "Date unavailable";
    }

    if (
      typeof timestamp.toDate === "function"
    ) {
      return timestamp
        .toDate()
        .toLocaleDateString("en-CA", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
    }

    return "Date unavailable";
  }

  const totalWastedItems = wasteItems.length;

  const totalWastedQuantity = wasteItems.reduce(
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
                    Items Wasted
                  </Typography>
                </Box>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ mt: 1 }}
                >
                  {totalWastedItems}
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
                    Total Quantity
                  </Typography>
                </Box>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ mt: 1 }}
                >
                  {totalWastedQuantity}
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