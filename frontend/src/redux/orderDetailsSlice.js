import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  schoolData: {},
  orderData: {},
  deviceData: {},
};

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    orderDataFunc: (state, action) => {
      return { ...state, orderData: action.payload };
    },
    schoolDataFunc: (state, action) => {
      return { ...state, schoolData: action.payload };
    },
    deviceDataFunc: (state, action) => {
      return { ...state, deviceData: action.payload };
    },
  },
});


export const { orderDataFunc, schoolDataFunc, deviceDataFunc } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
