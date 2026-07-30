import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Grid,
  Divider,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { formatDate, getExpiryStatus } from "../utils/dateUtils";

function PantryList({ items, onDelete, onEdit }) {
  if (items.length === 0) {
    return (
      <Card
        elevation={5}
        sx={{
          mt: 4,
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            gutterBottom
            fontWeight="bold"
          >
            📋 My Pantry
          </Typography>

          <Typography variant="h6">
            No matching pantry items found.
          </Typography>

          <Typography color="text.secondary">
            Try another search or add a new pantry item.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <div style={{ marginTop: 30 }}>
      <Typography
        variant="h4"
        gutterBottom
        fontWeight="bold"
      >
        📋 My Pantry
      </Typography>

      <Grid container spacing={3}>
        {items.map((item) => {
          const status = getExpiryStatus(item.expiry);

          return (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              key={item.id}
            >
              <Card
                elevation={4}
                sx={{
                  borderRadius: 3,
                  height: "100%",
                }}
              >
                <CardContent>

                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    gutterBottom
                  >
                    {item.name}
                  </Typography>

                  <Divider sx={{ mb: 2 }} />

                  <Stack spacing={1.5}>

                    <Typography>
                      <strong>🏷 Category:</strong>{" "}
                      {item.category || "Pantry"}
                    </Typography>

                    <Typography>
                      <strong>📦 Quantity:</strong>{" "}
                      {item.quantity}
                    </Typography>

                    <Typography>
                      <strong>📅 Expiry:</strong>{" "}
                      {formatDate(item.expiry)}
                    </Typography>

                    <Chip
                      label={status.text}
                      sx={{
                        bgcolor: status.color,
                        color: "white",
                        fontWeight: "bold",
                        width: "fit-content",
                      }}
                    />

                  </Stack>

                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ mt: 3 }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<EditIcon />}
                      onClick={() => onEdit(item)}
                    >
                      Edit
                    </Button>

                    <Button
                      fullWidth
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => onDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </Stack>

                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default PantryList;