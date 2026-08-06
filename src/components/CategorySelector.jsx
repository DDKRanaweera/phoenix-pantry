import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function CategorySelector({ category, setCategory }) {
  return (
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
  );
}

export default CategorySelector;