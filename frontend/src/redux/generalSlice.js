import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  enteredSchoolCode: 0,
  selectedProductId: 0,
  tabActiveKey : '1',
  viewProductId: 0
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    enteredSchoolCodeFunc: (state, action) => {
      return { ...state, enteredSchoolCode: action.payload };
    },
    selectedProductIdFunc: (state, action) => {
      return { ...state, selectedProductId: action.payload };
    },
    tabActiveKeyFunc: (state, action) => {
      return { ...state, tabActiveKey: action.payload };
    },viewProductIdFunc: (state, action) => {
      return { ...state, viewProductId: action.payload };
    },
  },
});


export const { enteredSchoolCodeFunc, selectedProductIdFunc, tabActiveKeyFunc, viewProductIdFunc } = generalSlice.actions;
export default generalSlice.reducer;
