import {createSlice} from "@reduxjs/toolkit"

const favoriteSlice =  createSlice({
    name:"favorites",
    initialState : [],
    reducers:{
        addToFav(state,action){
            console.log(action.payload);
            alert("Add To Fav Case" + action.payload.name)

           const isProductExist = state.find((product) => {
              return product.id === action.payload.id
           })
           if(isProductExist){
            alert(action.payload.name + "already exist")
           } else {
            state.push({...action.payload})
           }
        },
        removeFavoriteProduct(state,action){
            console.log("favorite state data ", state);
            
            alert("are you sure you want to remove it", action.payload.name);

            return state.filter((prod) => prod.id !== action.payload);
        }
    }

    
})
export const  {addToFav,removeFavoriteProduct} = favoriteSlice.actions;
export default favoriteSlice.reducer
