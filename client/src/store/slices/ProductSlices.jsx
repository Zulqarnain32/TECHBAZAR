import { createSlice } from "@reduxjs/toolkit";

// Load cart data from localStorage if available, else use an empty array
const initialState = Array.isArray(JSON.parse(localStorage.getItem("cart"))) 
  ? JSON.parse(localStorage.getItem("cart")) 
  : [];

const saveToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action) {
        console.log(action.payload); // complete single product will print
      
        if (!Array.isArray(state)) {
          state = []; // Ensure state is an array
        }
      
        const existingProduct = state.find((prod) => prod.id === action.payload.id);
      
        if (existingProduct) {
          alert(action.payload.name + " already exists");
          return state;
        } else {
          const newState = [...state, { ...action.payload, qty: 1 }];
          saveToLocalStorage(newState); // Save updated state to localStorage
          alert("item added to your cart")
          return newState; // Return new array to avoid state mutation issues
        }
      },
      

    incrProduct(state, action) {
      console.log("Product ID to increment:", action.payload);

      const product = state.find((prod) => prod.id === action.payload);
      if (product) {
        product.qty += 1;
        saveToLocalStorage(state);
      }
    },

    decrProduct(state, action) {
      const product = state.find((prod) => prod.id === action.payload);
      if (product && product.qty > 1) {
        product.qty -= 1;
        saveToLocalStorage(state);
      }
    },

    removeProduct(state, action) {
        const updatedState = state.filter((prod) => prod.id !== action.payload);
        saveToLocalStorage(updatedState);
        return updatedState; // Always return a new array
      }
      
  },
});

export const { addProduct, removeProduct, incrProduct, decrProduct } = productSlice.actions;
export default productSlice.reducer;
