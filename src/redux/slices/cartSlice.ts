import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  weight: string;
  stock: number;
};

type CartState = {
  items: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const getInitialCartState = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (e) {
        console.error("Error parsing cart from localStorage", e);
        return [];
      }
    }
  }
  return [];
};

const initialState: CartState = {
  items: getInitialCartState(),
  status: "idle",
  error: null,
};

// Thunks
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await axios.get(`/api/cart/get`);
  return response.data;
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartData: { userId: string; productId: string; quantity: number }) => {
    const response = await axios.post("/api/cart/add", cartData);
    return response.data;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId: string) => {
    const response = await axios.delete("/api/cart/remove", {
      data: { productId },
    });
    return response.data;
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (cartData: { userId: string; productId: string; quantity: number }) => {
    const response = await axios.patch("/api/cart/update", cartData);
    return response.data;
  }
);


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        localStorage.setItem("cart", JSON.stringify(state.items));
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload;
        localStorage.setItem("cart", JSON.stringify(state.items));
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload;
        localStorage.setItem("cart", JSON.stringify(state.items));
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload;
        localStorage.setItem("cart", JSON.stringify(state.items));
      });
  },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
