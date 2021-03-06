import { IProduct } from "Utils/Types/product";

export const categoriesFromProducts = (products: Array<IProduct>) => {
  const categoriesArr: Array<string> = [];
  products.forEach(({ categories }) => {
    categories.forEach(({ name }) => {
      if (!categoriesArr.includes(name)) {
        categoriesArr.push(name);
      }
    });
  });
  return categoriesArr;
};
