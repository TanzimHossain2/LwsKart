import { axiosInstance } from "@/config/axiosInstance";
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
    const savedCart = localStorage.getItem("xLwsCart");
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

/*
  - Thunks for fetching, adding, removing and updating cart items from the server 
*/

// Fetch cart
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  try {
    const response = await axios.get("/api/cart/get");
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
});

// Add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartData: { userId: string; productId: string; quantity: number }) => {
    try {
      const response = await axios.post("/api/cart/add", cartData);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

// Remove from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId: string) => {
    try {
      const response = await axios.delete("/api/cart/remove", {
        data: { productId },
      });
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

// Update cart item
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (cartData: { userId: string; productId: string; quantity: number }) => {
    try {
      const response = await axios.patch("/api/cart/update", cartData);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

// Cart slice for managing cart state
const cartSlice = createSlice({
  name: "xLwsCart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      localStorage.setItem("xLwsCart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("xLwsCart");
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.items = action.payload;
        localStorage.setItem("xLwsCart", JSON.stringify(state.items));
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })

      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to add to cart.";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.items = action.payload;
        localStorage.setItem("xLwsCart", JSON.stringify(state.items));
      })

      // Remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
      })

      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.items = action.payload;
        localStorage.setItem("xLwsCart", JSON.stringify(state.items));
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to remove from cart.";
      })

      // Update cart item
      .addCase(updateCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.items = action.payload;
        localStorage.setItem("xLwsCart", JSON.stringify(state.items));
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to update cart item.";
      });
  },
});

export const { setCart , clearCart} = cartSlice.actions;

export default cartSlice.reducer;
