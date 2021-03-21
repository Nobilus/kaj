export const addItem = (
  name: string,
  amount: number,
  price: string,
  img: string
) => {
  return {
    type: "ADD_ITEM",
    payload: { name, amount, price, img },
  };
};

export const deleteItem = (name: string) => {
  return { type: "REMOVE_ITEM", payload: { name } };
};

export const clearBasket = () => {
  return { type: "CLEAR_ALL" };
};
