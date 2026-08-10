import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { getExpiryStatus } from "../utils/dateUtils";

function ExpiredItems({ items }) {
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

  if (expiredItems.length === 0) {
    return null;
  }

  return (
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
          These items have passed their expiry date.
          Please review them before consuming or
          removing them.
        </Typography>

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
                  justifyContent: "space-between",
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

                <Chip
                  label={status.text}
                  color="error"
                  size="small"
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

export default ExpiredItems;