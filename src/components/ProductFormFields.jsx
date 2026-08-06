import { TextField } from "@mui/material";

function ProductFormFields({
  barcode,
  name,
  quantity,
  expiry,
  setName,
  setQuantity,
  setExpiry,
}) {
  return (
    <>
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
    </>
  );
}

export default ProductFormFields;