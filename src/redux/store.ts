import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import wishListReducer from "./slices/wishListSlice";
import categoryReducer from "./slices/categorySlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishListReducer,
    category: categoryReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
