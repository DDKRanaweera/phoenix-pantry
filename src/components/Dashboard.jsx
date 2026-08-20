import { useState } from "react";

import AddPantryItem from "./AddPantryItem";
import PantryList from "./PantryList";
import CategoryChart from "./CategoryChart";
import ExpiryChart from "./ExpiryChart";
import ExpiryAlerts from "./ExpiryAlerts";
import ExpiringSoon from "./ExpiringSoon";
import ExpiredItems from "./ExpiredItems";
import FoodWasteHistory from "./FoodWasteHistory";

import { getExpiryStatus } from "../utils/dateUtils";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ErrorIcon from "@mui/icons-material/Error";

function Dashboard({
  items,
  onSave,
  onDelete,
  onEdit,
  editingItem,
}) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [foodWasteRefresh, setFoodWasteRefresh] =
    useState(0);

  let expired = 0;
  let todayCount = 0;
  let weekCount = 0;

  items.forEach((item) => {
    const status = getExpiryStatus(item.expiry);

    if (status.diffDays < 0) {
      expired++;
    } else if (status.diffDays === 0) {
      todayCount++;
    } else if (status.diffDays <= 7) {
      weekCount++;
    }
  });

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      (item.category || "Pantry") ===
        selectedCategory;

    return matchesSearch && matchesCategory;
  });

  function handleFoodWasteRecorded() {
    setFoodWasteRefresh(
      (current) => current + 1
    );
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "30px auto",
        padding: "20px",
      }}
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        fontWeight="bold"
      >
        📊 Dashboard
      </Typography>

      {/* Statistics */}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={4}
            sx={{ borderRadius: 3 }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Inventory2Icon
                sx={{
                  fontSize: 55,
                  color: "#2E7D32",
                }}
              />

              <Typography variant="h3">
                {items.length}
              </Typography>

              <Typography>
                Pantry Items
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={4}
            sx={{ borderRadius: 3 }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <WarningAmberIcon
                sx={{
                  fontSize: 55,
                  color: "#ef6c00",
                }}
              />

              <Typography variant="h3">
                {todayCount}
              </Typography>

              <Typography>
                Expiring Today
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={4}
            sx={{ borderRadius: 3 }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <EventAvailableIcon
                sx={{
                  fontSize: 55,
                  color: "#1565C0",
                }}
              />

              <Typography variant="h3">
                {weekCount}
              </Typography>

              <Typography>
                Next 7 Days
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={4}
            sx={{ borderRadius: 3 }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <ErrorIcon
                sx={{
                  fontSize: 55,
                  color: "#D32F2F",
                }}
              />

              <Typography variant="h3">
                {expired}
              </Typography>

              <Typography>
                Expired
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Expiry Alerts */}

      <ExpiryAlerts items={items} />

      {/* Expiring Soon */}

      <ExpiringSoon items={items} />

      {/* Expired Items */}

      <ExpiredItems
        items={items}
        onDelete={onDelete}
        onFoodWasteRecorded={
          handleFoodWasteRecorded
        }
      />

      {/* Food Waste History */}

      <FoodWasteHistory
        refreshTrigger={foodWasteRefresh}
      />

      {/* Charts */}

      <Grid
        container
        spacing={3}
        sx={{ mb: 4 }}
        alignItems="stretch"
      >
        <Grid item xs={12} lg={5}>
          <CategoryChart items={items} />
        </Grid>

        <Grid item xs={12} lg={7}>
          <ExpiryChart items={items} />
        </Grid>
      </Grid>

      {/* Add Item */}

      <AddPantryItem
        onSave={onSave}
        editingItem={editingItem}
      />

      {/* Search */}

      <Card
        elevation={5}
        sx={{
          mt: 4,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            🔍 Search & Filter Pantry
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="Search Item"
              fullWidth
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <FormControl fullWidth>
              <InputLabel>
                Category
              </InputLabel>

              <Select
                value={selectedCategory}
                label="Category"
                onChange={(e) =>
                  setSelectedCategory(
                    e.target.value
                  )
                }
              >
                <MenuItem value="All">
                  All Categories
                </MenuItem>

                <MenuItem value="Pantry">
                  🥫 Pantry
                </MenuItem>

                <MenuItem value="Dairy">
                  🥛 Dairy
                </MenuItem>

                <MenuItem value="Fruit">
                  🍎 Fruit
                </MenuItem>

                <MenuItem value="Vegetables">
                  🥦 Vegetables
                </MenuItem>

                <MenuItem value="Meat">
                  🥩 Meat
                </MenuItem>

                <MenuItem value="Frozen">
                  🧊 Frozen
                </MenuItem>

                <MenuItem value="Drinks">
                  🥤 Drinks
                </MenuItem>

                <MenuItem value="Snacks">
                  🍪 Snacks
                </MenuItem>

                <MenuItem value="Bakery">
                  🍞 Bakery
                </MenuItem>

                <MenuItem value="Other">
                  📦 Other
                </MenuItem>
              </Select>
            </FormControl>

            <Typography align="center">
              Showing{" "}
              <strong>
                {filteredItems.length}
              </strong>{" "}
              item(s)
            </Typography>

            {(search ||
              selectedCategory !== "All") && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
              >
                Clear Filters
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Pantry List */}

      <PantryList
        items={filteredItems}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
}

export default Dashboard;