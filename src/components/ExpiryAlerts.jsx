import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
} from "@mui/material";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorIcon from "@mui/icons-material/Error";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import {
  getExpiryCategory,
  getExpiryStatus,
} from "../utils/dateUtils";

function ExpiryAlerts({ items }) {
  const urgentItems = items
    .filter((item) => {
      const category = getExpiryCategory(item.expiry);

      return (
        category === "expired" ||
        category === "today" ||
        category === "within3Days"
      );
    })
    .sort((a, b) => {
      return (
        getExpiryStatus(a.expiry).diffDays -
        getExpiryStatus(b.expiry).diffDays
      );
    });

  if (urgentItems.length === 0) {
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
          >
            <EventAvailableIcon color="success" />

            <Typography
              variant="h6"
              fontWeight="bold"
            >
              Expiry Alerts
            </Typography>
          </Box>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            🎉 Great! You don't have any items
            that need immediate attention.
          </Typography>
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
          mb={2}
        >
          <WarningAmberIcon color="warning" />

          <Typography
            variant="h6"
            fontWeight="bold"
          >
            Use First
          </Typography>
        </Box>

        <Typography
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          These items should be used soon to
          help reduce food waste.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {urgentItems.map((item) => {
            const status = getExpiryStatus(
              item.expiry
            );

            const isExpired =
              status.diffDays < 0;

            const isToday =
              status.diffDays === 0;

            return (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: isExpired
                    ? "#ffebee"
                    : isToday
                    ? "#fff3e0"
                    : "#fff8e1",
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  minWidth={0}
                >
                  {isExpired ? (
                    <ErrorIcon color="error" />
                  ) : (
                    <WarningAmberIcon color="warning" />
                  )}

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
                </Box>

                <Chip
                  label={status.text}
                  size="small"
                  sx={{
                    color: status.color,
                    borderColor: status.color,
                    fontWeight: "bold",
                  }}
                  variant="outlined"
                />
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}

export default ExpiryAlerts;