import { useState, useEffect } from "react";

import BarcodeScanner from "./BarcodeScanner";
import ProductPreview from "./ProductPreview";
import ProductFormFields from "./ProductFormFields";
import CategorySelector from "./CategorySelector";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Collapse,
} from "@mui/material";

function AddPantryItem({
  onSave,
  editingItem,
}) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiry, setExpiry] = useState("");
  const [category, setCategory] = useState("Pantry");

  const [barcode, setBarcode] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");

  const [showScanner, setShowScanner] =
    useState(false);

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name || "");
      setQuantity(editingItem.quantity || "");
      setExpiry(editingItem.expiry || "");
      setCategory(
        editingItem.category || "Pantry"
      );

      setBarcode(
        editingItem.barcode || ""
      );

      setBrand(
        editingItem.brand || ""
      );

      setImage(
        editingItem.image || ""
      );
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
    setBrand("");
    setImage("");

    setShowScanner(false);
  }

  function mapCategory(apiCategory) {
    if (!apiCategory) return "Pantry";

    const value =
      apiCategory.toLowerCase();

    if (
      value.includes("milk") ||
      value.includes("dairy") ||
      value.includes("cheese") ||
      value.includes("yogurt")
    ) {
      return "Dairy";
    }

    if (
      value.includes("fruit")
    ) {
      return "Fruit";
    }

    if (
      value.includes("vegetable")
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

    if (
      value.includes("frozen")
    ) {
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
    setBarcode(
      product.barcode || ""
    );

    setBrand(
      product.brand || ""
    );

    setImage(
      product.image || ""
    );

    if (product.name) {
      setName(product.name);
    }

    if (product.category) {
      setCategory(
        mapCategory(product.category)
      );
    }

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
      brand,
      image,
    });

    resetForm();
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
          {editingItem
            ? "Edit Pantry Item"
            : "Add Pantry Item"}
        </Typography>

        <form
          onSubmit={handleSubmit}
        >

          <Button
            type="button"
            variant="outlined"
            fullWidth
            sx={{
              mb: 2,
            }}
            onClick={() =>
              setShowScanner(
                !showScanner
              )
            }
          >
            {showScanner
              ? "Close Scanner"
              : "📷 Scan Barcode"}
          </Button>

          <Collapse
            in={showScanner}
          >
            <BarcodeScanner
              onDetected={
                handleDetected
              }
            />
          </Collapse>

          {/* Continue in Part 2 */}
                    <ProductPreview
            image={image}
            brand={brand}
            name={name}
          />

          <ProductFormFields
            barcode={barcode}
            name={name}
            quantity={quantity}
            expiry={expiry}
            setName={setName}
            setQuantity={setQuantity}
            setExpiry={setExpiry}
          />

          <CategorySelector
            category={category}
            setCategory={setCategory}
          />

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
            {editingItem
              ? "Save Changes"
              : "Save Item"}
          </Button>

        </form>

      </CardContent>
    </Card>
  );
}

export default AddPantryItem;