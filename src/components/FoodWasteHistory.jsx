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

import { auth } from "../services/firebase";
import { getFoodWaste } from "../services/foodWaste";

function FoodWasteHistory({ refreshTrigger = 0 }) {
  const [wasteItems, setWasteItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFoodWaste() {
      const user = auth.currentUser;

      if (!user) {
        setError(
          "You must be signed in to view food waste history."
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
          "Failed to load food waste history:",
          error
        );

        setError(
          "Unable to load food waste history."
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
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={4}
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
          display="flex"
          alignItems="center"
          gap={1}
          mb={1}
        >
          <DeleteOutlineIcon color="error" />

          <Typography
            variant="h6"
            fontWeight="bold"
          >
            Food Waste History
          </Typography>
        </Box>

        <Typography
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          A record of food items that have been
          marked as wasted.
        </Typography>

        {wasteItems.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 4,
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
              Great job! Your food waste history
              is currently empty.
            </Typography>
          </Box>
        ) : (
          <Box>
            {wasteItems.map((item, index) => (
              <Box key={item.id}>
                <Box
                  sx={{
                    py: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box minWidth={0}>
                    <Typography fontWeight="bold">
                      {item.itemName ||
                        "Unknown Item"}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      Category:{" "}
                      {item.category || "Other"}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Quantity:{" "}
                      {item.quantity ?? 0}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Reason:{" "}
                      {item.reason ||
                        "Not specified"}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      textAlign: "right",
                      flexShrink: 0,
                    }}
                  >
                    {formatWasteDate(
                      item.wastedAt
                    )}
                  </Typography>
                </Box>

                {index <
                  wasteItems.length - 1 && (
                  <Divider />
                )}
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default FoodWasteHistory;