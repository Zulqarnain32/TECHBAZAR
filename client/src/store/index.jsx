import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/ProductSlices"

const store = configureStore({
    reducer:{
        products:productSlice
    }
})

export default store