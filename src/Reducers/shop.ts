import { v4 as uuidv4 } from 'uuid';

const shopReducer = (state = {}, action: any) => {
  switch (action.type) {
    case "ADD_ITEM":
      const key = uuidv4();
      const name = action.payload.name;
      const price = action.payload.price;
      const amount = action.payload.amount;
      const img = action.payload.img;
      const size = action.payload?.size;
      const type = action.payload?.type;

      return {
        ...state,
        [key]: { name, price, img, amount, size, type },
      };

    case "REMOVE_ITEM":
      const itemkey = action.payload.name;
      // @ts-ignore
      delete state[itemkey];
      return { ...state };

    case "CLEAR_ALL":
      return {};
    default:
      return state;
  }
};

export default shopReducer;
