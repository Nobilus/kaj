import shopReducer from "./shop";
import { combineReducers } from "redux";

const allReducers = combineReducers({ shop: shopReducer });

export default allReducers;
