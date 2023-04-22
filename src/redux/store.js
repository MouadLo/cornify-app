import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import authReducer from "./reducers/auth";
import productReducer from "./reducers/products";
import updateProductReducer from "./reducers/updateProduct";
import categoriesReducer from "./reducers/categoriesSlice";
import cartReducer from "./reducers/cartSlice";
import customerReducer from "./reducers/customerSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  updateProduct: updateProductReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  customer: customerReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
