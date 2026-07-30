import { useState, useEffect } from "react";
import BarcodeScanner from "./BarcodeScanner";

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Collapse,
} from "@mui/material";

function AddPantryItem({ onSave, editingItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiry, setExpiry] = useState("");
  const [category, setCategory] = useState("Pantry");

  const [barcode, setBarcode] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setQuantity(editingItem.quantity);
      setExpiry(editingItem.expiry);
      setCategory(editingItem.category || "Pantry");
      setBarcode(editingItem.barcode || "");
    } else {
      resetForm();
    }
  }, [editingItem]);

  function resetForm() {
    setName("");
    setQuantity("");
    setExpiry("");
    setCategory("Pantry");
    setBarcode("");
    setShowScanner(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSave({
      name,
      quantity: Number(quantity),
      expiry,
      category,
      barcode,
    });

    resetForm();
  }

  function mapCategory(apiCategory) {
    if (!apiCategory) return "Pantry";

    const value = apiCategory.toLowerCase();

    if (
      value.includes("milk") ||
      value.includes("dairy") ||
      value.includes("cheese") ||
      value.includes("yogurt")
    ) {
      return "Dairy";
    }

    if (value.includes("fruit")) {
      return "Fruit";
    }

    if (
      value.includes("vegetable") ||
      value.includes("vegetables")
    ) {
      return "Vegetables";
    }

    if (
      value.includes("meat") ||
      value.includes("beef") ||
      value.includes("pork") ||
      value.includes("chicken")
    ) {
      return "Meat";
    }

    if (value.includes("frozen")) {
      return "Frozen";
    }

    if (
      value.includes("drink") ||
      value.includes("beverage") ||
      value.includes("juice") ||
      value.includes("soda")
    ) {
      return "Drinks";
    }

    if (
      value.includes("snack") ||
      value.includes("chips") ||
      value.includes("cookie")
    ) {
      return "Snacks";
    }

    if (
      value.includes("bread") ||
      value.includes("bakery") ||
      value.includes("cake")
    ) {
      return "Bakery";
    }

    return "Pantry";
  }

  function handleDetected(product) {
    setBarcode(product.barcode || "");

    if (product.name) {
      setName(product.name);
    }

    if (product.category) {
      setCategory(mapCategory(product.category));
    }

    setShowScanner(false);
  }

  return (
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
          fontWeight="bold"
          align="center"
          gutterBottom
        >
          {editingItem ? "Edit Pantry Item" : "Add Pantry Item"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Button
            type="button"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            onClick={() => setShowScanner(!showScanner)}
          >
            {showScanner ? "Close Scanner" : "📷 Scan Barcode"}
          </Button>

          <Collapse in={showScanner}>
            <BarcodeScanner onDetected={handleDetected} />
          </Collapse>

          <TextField
            fullWidth
            label="Barcode"
            margin="normal"
            value={barcode}
            InputProps={{
              readOnly: true,
            }}
          />

          <TextField
            fullWidth
            label="Item Name"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Quantity"
            type="number"
            margin="normal"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Expiry Date"
            type="date"
            margin="normal"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />

          <FormControl
            fullWidth
            margin="normal"
          >
            <InputLabel>Category</InputLabel>

            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="Pantry">🥫 Pantry</MenuItem>
              <MenuItem value="Dairy">🥛 Dairy</MenuItem>
              <MenuItem value="Fruit">🍎 Fruit</MenuItem>
              <MenuItem value="Vegetables">🥦 Vegetables</MenuItem>
              <MenuItem value="Meat">🥩 Meat</MenuItem>
              <MenuItem value="Frozen">🧊 Frozen</MenuItem>
              <MenuItem value="Drinks">🥤 Drinks</MenuItem>
              <MenuItem value="Snacks">🍪 Snacks</MenuItem>
              <MenuItem value="Bakery">🍞 Bakery</MenuItem>
              <MenuItem value="Other">📦 Other</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            size="large"
            sx={{
              mt: 3,
              py: 1.5,
            }}
          >
            {editingItem ? "Save Changes" : "Save Item"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default AddPantryItem;