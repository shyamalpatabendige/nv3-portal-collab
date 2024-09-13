import { createSelector, createSlice } from "@reduxjs/toolkit";

let initialState = {
  isRepair: false,
  selectedProductId: 0,
  tabActiveKey : '1',
  viewProductId: 0,
  repairDetailsForm: {},
  apiStatus: "PENDING"
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
    setIsRepairApiStatus: (state, action) => {
      return { ...state, apiStatus: action.payload };
    },
  },
});

export const getRepairFormDetails = (state => state?.repair?.repairDetailsForm);
export const getIsRepairApiStatus = (state => state?.repair?.apiStatus);

export const { setIsRepair, setRepairDetailsForm, setIsRepairApiStatus } = repairSlice.actions;
export default repairSlice.reducer;
