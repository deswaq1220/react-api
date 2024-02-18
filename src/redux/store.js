import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import BrandModalReducer from "./BrandModalReducer";
export const store = configureStore({
  reducer:{
    modal:reducer,
    BrandModal:BrandModalReducer
  }
})