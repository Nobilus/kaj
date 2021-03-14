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
