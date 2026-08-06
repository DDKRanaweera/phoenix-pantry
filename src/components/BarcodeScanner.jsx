import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

import { getProduct } from "../services/openFoodFacts";

function BarcodeScanner({ onDetected }) {
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleScan(results) {
    if (!results || results.length === 0) return;

    const barcode = results[0].rawValue;

    setScanning(false);
    setLoading(true);

    const product = await getProduct(barcode);

    console.log(product);

    setLoading(false);

    if (!product) {
      alert("Product not found.");
      return;
    }

    onDetected({
      barcode,
      name: product.product_name || "",
      brand: product.brands || "",
      category:
        product.categories_tags?.[0]
          ?.replace("en:", "")
          ?.replace(/-/g, " ") || "Pantry",
      image: product.image_front_small_url || "",
    });
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      {!scanning && (
        <button
          onClick={() => setScanning(true)}
        >
          📷 Scan Barcode
        </button>
      )}

      {loading && (
        <p>Looking up product...</p>
      )}

      {scanning && (
        <Scanner
          onScan={handleScan}
          onError={(err) => console.log(err)}
        />
      )}
    </div>
  );
}

export default BarcodeScanner;