export const addItem = (
  name: string,
  amount: number,
  price: string,
  img: string,
  size?: string,
  type?: string,
) => {
  console.log("adding item in action: ");

  return {
    type: "ADD_ITEM",
    payload: { name, amount, price, img, size, type },
  };
};

export const deleteItem = (name: string) => {
  return { type: "REMOVE_ITEM", payload: { name } };
};

export const clearBasket = () => {
  return { type: "CLEAR_ALL" };
};
