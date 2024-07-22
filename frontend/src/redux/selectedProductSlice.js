import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  selectedProductList: [],
};

const selectedProductSlice = createSlice({
  name: "selectedProduct",
  initialState,
  reducers: {
    selectedProductListFunc: (state, action) => {
      return { ...state, selectedProductList: action.payload };
    }
  },
});


export const { selectedProductListFunc } = selectedProductSlice.actions;
export default selectedProductSlice.reducer;
