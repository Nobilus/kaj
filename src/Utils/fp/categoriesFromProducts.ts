import { IProduct } from "Utils/Types/product";

export const categoriesFromProducts = (products: Array<IProduct>) => {
  const catObj = {};

  products.forEach(({ categories }) => {
    categories.forEach(({ name, id }) => {
      if (!Object.keys(catObj).includes(name)) {
        //@ts-ignore
        catObj[name] = id;
      }
    });
  });
  return catObj;
};
