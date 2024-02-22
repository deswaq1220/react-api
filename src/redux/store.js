import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import BrandModalReducer from "./BrandModalReducer";
import authReducer from "./authReducer";
export const store = configureStore({
  reducer:{
    modal:reducer,
    BrandModal:BrandModalReducer,
    auth:authReducer
  }
})