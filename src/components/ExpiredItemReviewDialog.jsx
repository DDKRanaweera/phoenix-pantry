import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

function ExpiredItemReviewDialog({
  open,
  item,
  onClose,
  onWasted,
  onUsed,
  onKeep,
}) {
  if (!item) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Review Expired Item
      </DialogTitle>

      <DialogContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ mb: 1 }}
        >
          {item.name}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          Quantity: {item.quantity}
        </Typography>

        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: "#fff3e0",
            mb: 2,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
          >
            This item has passed its expiry date.
            Please choose what happened to it.
          </Typography>
        </Box>

        <Typography variant="body1">
          What would you like to do?
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          px: 3,
          pb: 3,
        }}
      >
        <Button
          variant="outlined"
          onClick={onKeep}
        >
          ⏰ Keep
        </Button>

        <Button
          variant="outlined"
          color="success"
          onClick={onUsed}
        >
          ✅ Used
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={onWasted}
        >
          🗑️ Wasted
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ExpiredItemReviewDialog;