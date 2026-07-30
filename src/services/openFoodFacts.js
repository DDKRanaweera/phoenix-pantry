export async function getProduct(barcode) {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
    );

    const data = await response.json();

    if (
      data.status === 1 &&
      data.product
    ) {
      return data.product;
    }

    return null;
  } catch (error) {
    console.error(error);

    return null;
  }
}