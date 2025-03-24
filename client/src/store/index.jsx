import {configureStore} from "@reduxjs/toolkit"

import productSlice from "./slices/ProductSlices"
import favoriteSlice from "./slices/FavoriteSlices"

const store = configureStore({
    reducer:{
        products:productSlice,
        favorites:favoriteSlice
    }
})
export default store