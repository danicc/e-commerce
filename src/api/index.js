import { products } from "./products.json";

export function getProductsBySublevel(sublevelId) {
  return products.filter(product => {
    return product.sublevel_id === sublevelId;
  });
}

export function getProductsByFilter(
  filterProducts,
  availability,
  price,
  stock
) {
  const products = filterProducts.filter(product => {
    const availabilityValue = mapAvailability(availability);
    return (
      (availabilityValue === null || product.available === availabilityValue) &&
      (product.quantity === stock || !stock) &&
      ((parseFloat(product.price.substring(1)) >= price.from &&
        parseFloat(product.price.substring(1)) <= price.to) ||
        !Object.keys(price).length)
    );
  });

  return products;
}

function mapAvailability(availability) {
  switch (availability) {
    case "available":
      return true;
    case "notAvailable":
      return false;
    default:
      return null;
  }
}
