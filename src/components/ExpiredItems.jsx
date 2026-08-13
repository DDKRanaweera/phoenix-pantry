import { useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  CircularProgress,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { auth } from "../services/firebase";
import { addFoodWaste } from "../services/foodWaste";

import { getExpiryStatus } from "../utils/dateUtils";

import ExpiredItemReviewDialog from "./ExpiredItemReviewDialog";

function ExpiredItems({ items, onDelete }) {
  const [selectedItem, setSelectedItem] =
    useState(null);

  const [processing, setProcessing] =
    useState(false);

  const [error, setError] = useState("");

  const expiredItems = items
    .filter((item) => {
      return getExpiryStatus(item.expiry).diffDays < 0;
    })
    .sort((a, b) => {
      return (
        getExpiryStatus(a.expiry).diffDays -
        getExpiryStatus(b.expiry).diffDays
      );
    });

  function closeDialog() {
    if (processing) return;

    setSelectedItem(null);
    setError("");
  }

  async function handleWasted() {
    if (!selectedItem) return;

    const user = auth.currentUser;

    if (!user) {
      setError(
        "You must be signed in to record food waste."
      );
      return;
    }

    try {
      setProcessing(true);
      setError("");

      // 1. Save the food waste record first.
      await addFoodWaste(user.uid, {
        itemName: selectedItem.name || "",
        quantity:
          Number(selectedItem.quantity) || 0,
        category:
          selectedItem.category || "Other",
        expiryDate:
          selectedItem.expiry || "",
        barcode:
          selectedItem.barcode || "",
        image:
          selectedItem.image || "",
        reason: "Expired",
      });

      // 2. Only delete from pantry after
      //    the waste record succeeds.
      await onDelete(selectedItem.id);

      // 3. Close the dialog.
      setSelectedItem(null);
    } catch (error) {
      console.error(
        "Failed to record food waste:",
        error
      );

      setError(
        "Unable to record this item as food waste. The pantry item was not removed."
      );
    } finally {
      setProcessing(false);
    }
  }

  async function handleUsed() {
    if (!selectedItem) return;

    try {
      setProcessing(true);
      setError("");

      // Dashboard owns the pantry state,
      // so use its existing delete handler.
      await onDelete(selectedItem.id);

      setSelectedItem(null);
    } catch (error) {
      console.error(
        "Failed to remove used item:",
        error
      );

      setError(
        "Unable to remove this pantry item. Please try again."
      );
    } finally {
      setProcessing(false);
    }
  }

  function handleKeep() {
    if (processing) return;

    setSelectedItem(null);
    setError("");
  }

  if (expiredItems.length === 0) {
    return null;
  }

  return (
    <>
      <Card
        elevation={3}
        sx={{
          mb: 4,
          borderRadius: 3,
          border: "1px solid #ffcdd2",
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
              Expired Items
            </Typography>
          </Box>

          <Typography
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            These items have passed their expiry
            date. Please review them before
            consuming or removing them.
          </Typography>

          {error && (
            <Box
              sx={{
                mb: 2,
                p: 2,
                borderRadius: 2,
                backgroundColor: "#ffebee",
                border: "1px solid #ef9a9a",
              }}
            >
              <Typography
                color="error"
                variant="body2"
              >
                {error}
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            {expiredItems.map((item) => {
              const status = getExpiryStatus(
                item.expiry
              );

              return (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      "space-between",
                    gap: 2,
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: "#ffebee",
                  }}
                >
                  <Box minWidth={0}>
                    <Typography
                      fontWeight="bold"
                      noWrap
                    >
                      {item.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Quantity: {item.quantity}
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    flexShrink={0}
                  >
                    <Chip
                      label={status.text}
                      color="error"
                      size="small"
                      variant="outlined"
                    />

                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      disabled={processing}
                      onClick={() =>
                        setSelectedItem(item)
                      }
                    >
                      Review
                    </Button>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </CardContent>
      </Card>

      <ExpiredItemReviewDialog
        open={Boolean(selectedItem)}
        item={selectedItem}
        onClose={closeDialog}
        onWasted={handleWasted}
        onUsed={handleUsed}
        onKeep={handleKeep}
      />

      {processing && (
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 2000,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 4,
            px: 2,
            py: 1.5,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <CircularProgress size={22} />

          <Typography variant="body2">
            Updating pantry...
          </Typography>
        </Box>
      )}
    </>
  );
}

export default ExpiredItems;