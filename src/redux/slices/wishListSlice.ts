import { createSlice } from "@reduxjs/toolkit";

type WishListItem = {
  id: string;
  title: string;
  price: number;
  qty: number;
  image: string;
  weight: string;
};

type WishListState = {
  items: WishListItem[];
  success: string | null;
  error: string | null;
};

const initialState: WishListState = {
  items: [],
  success: null,
  error: null,
};

const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const newItem = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === newItem.id);
      if (itemIndex === -1) {
        state.items.push(newItem);
        state.success = "Product added to wishlist";
        state.error = null;
      } else {
        state.error = "Product already in wishlist";
      }
    },
    removeFromWishList: (state, action) => {
      const id = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
        state.success = "Product removed from wishlist";
        state.error = null;
      }
    },
  },
});

export const { addToWishList, removeFromWishList } = wishListSlice.actions;

export default wishListSlice.reducer;
