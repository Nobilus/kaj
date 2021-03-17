const shopReducer = (state = {}, action: any) => {
  switch (action.type) {
    case "ADD_ITEM":
      const key = action.payload.name;
      const price = action.payload.price;
      const amount = action.payload.amount;
      const img = action.payload.img;
      return {
        ...state,
        [key]: { price, img, amount },
      };

    case "REMOVE_ITEM":
      const itemkey = action.payload.name;
      // @ts-ignore
      delete state[itemkey];
      return { ...state };

    default:
      return state;
  }
};

export default shopReducer;
