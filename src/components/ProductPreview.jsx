import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
} from "@mui/material";

import Inventory2Icon from "@mui/icons-material/Inventory2";

function ProductPreview({
  image,
  brand,
  name,
}) {
  // Don't show anything until we have product information
  if (!image && !brand && !name) {
    return null;
  }

  return (
    <Card
      elevation={3}
      sx={{
        mb: 3,
        borderRadius: 3,
        bgcolor: "#fafafa",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
        >
          📦 Detected Product
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          gap={3}
        >
          {image ? (
            <img
              src={image}
              alt={name}
              style={{
                width: 110,
                height: 110,
                objectFit: "contain",
                borderRadius: 10,
                border: "1px solid #ddd",
                background: "#fff",
                padding: 8,
              }}
            />
          ) : (
            <Avatar
              sx={{
                width: 110,
                height: 110,
                bgcolor: "#E8F5E9",
              }}
            >
              <Inventory2Icon
                sx={{
                  fontSize: 60,
                  color: "#2E7D32",
                }}
              />
            </Avatar>
          )}

          <Box flex={1}>
            <Typography
              variant="h6"
              fontWeight="bold"
            >
              {name || "Unknown Product"}
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {brand || "Unknown Brand"}
            </Typography>

            <Chip
              label="Scanned Successfully"
              color="success"
              size="small"
              sx={{ mt: 2 }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductPreview;