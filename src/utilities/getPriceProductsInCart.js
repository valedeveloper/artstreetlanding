export const getPriceProductsInCart = (items) => {
  const priceProducts = items.reduce(
    (total, { product }) => total + product.price,
    0
  );
  return priceProducts;
};
