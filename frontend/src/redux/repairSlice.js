import { createSelector, createSlice } from "@reduxjs/toolkit";

let initialState = {
  isRepair: false,
  selectedProductId: 0,
  tabActiveKey : '1',
  viewProductId: 0,
  repairDetailsForm: {},
};

const repairSlice = createSlice({
  name: "repair",
  initialState,
  reducers: {
    setIsRepair: (state, action) => {
      return { ...state, isRepair: action.payload };
    },
    setRepairDetailsForm: (state, action) => {
      return { ...state, repairDetailsForm: action.payload };
    },
  },
});

export const getRepairFormDetails = (state => state?.repair?.repairDetailsForm)

export const { setIsRepair, setRepairDetailsForm } = repairSlice.actions;
export default repairSlice.reducer;
