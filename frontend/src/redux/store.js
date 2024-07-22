import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./generalSlice";
import orderDetailsSlice from "./orderDetailsSlice";
import personalDetailsFormSlice from "./personalDetailsFormSlice";
import selectedProductSlice from "./selectedProductSlice";


const store = configureStore({
    reducer:{
        general: generalSlice,
        pdForm: personalDetailsFormSlice,
        orderDetails: orderDetailsSlice,
        selectedProduct: selectedProductSlice,
    }
});

export default store;