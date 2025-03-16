import {createSlice} from "@reduxjs/toolkit"

const productSlice =  createSlice({
    name:"products",
    initialState : [],
    reducers:{
        addToCart(state,action){
            console.log(action.payload);
            state.push(action.payload)
            

        },
        incrProduct(state,action){

        },
        decrProduct(state,action){

        },
        removeProduct(state,action){

        }
    }

    
})
export const  {addToCart,incrProduct,decrProduct,removeProduct} = productSlice.actions;
export default productSlice.reducer