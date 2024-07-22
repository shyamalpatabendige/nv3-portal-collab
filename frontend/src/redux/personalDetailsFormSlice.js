import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  activeForm: 'loginregisterform'
  //registerform
};

const personalDetailsFormSlice = createSlice({
  name: "pdForm",
  initialState,
  reducers: {
    activeFormFunc: (state, action) => {
      return { ...state, activeForm: action.payload };
    },
  },
});


export const { activeFormFunc } = personalDetailsFormSlice.actions;
export default personalDetailsFormSlice.reducer;
