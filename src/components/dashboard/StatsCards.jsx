import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ErrorIcon from "@mui/icons-material/Error";

function StatsCards({
  totalItems,
  todayCount,
  weekCount,
  expiredCount,
}) {
  const cards = [
    {
      title: "Pantry Items",
      value: totalItems,
      icon: <Inventory2Icon sx={{ fontSize: 46 }} />,
      color: "#2E7D32",
    },
    {
      title: "Expiring Today",
      value: todayCount,
      icon: <WarningAmberIcon sx={{ fontSize: 46 }} />,
      color: "#EF6C00",
    },
    {
      title: "Next 7 Days",
      value: weekCount,
      icon: <EventAvailableIcon sx={{ fontSize: 46 }} />,
      color: "#1565C0",
    },
    {
      title: "Expired",
      value: expiredCount,
      icon: <ErrorIcon sx={{ fontSize: 46 }} />,
      color: "#D32F2F",
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: 3,
        mb: 4,
      }}
    >
      {cards.map((card) => (
        <Card
          key={card.title}
          elevation={4}
          sx={{
            borderRadius: 3,
            height: "100%",
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              py: 4,
            }}
          >
            <Box
              sx={{
                color: card.color,
                mb: 1,
              }}
            >
              {card.icon}
            </Box>

            <Typography
              variant="h3"
              fontWeight="bold"
            >
              {card.value}
            </Typography>

            <Typography
              color="text.secondary"
            >
              {card.title}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default StatsCards;