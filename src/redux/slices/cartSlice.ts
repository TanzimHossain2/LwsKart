import { createSlice } from "@reduxjs/toolkit";

type CartItem = {
  id: string;
  title: string;
  price: number;
  qty: number;
  image: string;
  weight: string;
}

const initialState : CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {

      const newItem = action.payload;
      const itemIndex = state.findIndex((item) => item.id === newItem.id);

      if (itemIndex === -1) {
        state.push(newItem);
      } else {
        //prevent duplicate items
        state[itemIndex].qty += newItem.qty;
      }
    },

    removeFromCart: (state, action) => {
       const id = action.payload;
        const itemIndex = state.findIndex((item) => item.id === id);
        if (itemIndex !== -1) {
          state.splice(itemIndex, 1);
        }
    },
    incrementQty: (state, action) => {
       const id = action.payload;
        const itemIndex = state.findIndex((item) => item.id === id);
        if (itemIndex !== -1) {
          state[itemIndex].qty += 1;
        }
    },
    decrementQty: (state, action) => {
        const id = action.payload;
          const itemIndex = state.findIndex((item) => item.id === id);
          if (itemIndex !== -1) {
            state[itemIndex].qty -= 1;
          }
    },
  },
});

export const {addToCart,decrementQty,incrementQty,removeFromCart} = cartSlice.actions;

export default cartSlice.reducer;
