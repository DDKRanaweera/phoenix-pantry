import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
} from "@mui/material";

import EventIcon from "@mui/icons-material/Event";

import {
  getExpiryCategory,
  getExpiryStatus,
} from "../utils/dateUtils";

function ExpiringSoon({ items }) {
  const expiringItems = items
    .filter((item) => {
      return (
        getExpiryCategory(item.expiry) ===
        "within7Days"
      );
    })
    .sort((a, b) => {
      return (
        getExpiryStatus(a.expiry).diffDays -
        getExpiryStatus(b.expiry).diffDays
      );
    });

  if (expiringItems.length === 0) {
    return null;
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
          <EventIcon color="warning" />

          <Typography
            variant="h6"
            fontWeight="bold"
          >
            Expiring Soon
          </Typography>
        </Box>

        <Typography
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          These items expire within the next
          4–7 days.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {expiringItems.map((item) => {
            const status = getExpiryStatus(
              item.expiry
            );

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
                  backgroundColor: "#fff8e1",
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

                <Chip
                  label={status.text}
                  size="small"
                  color="warning"
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

export default ExpiringSoon;