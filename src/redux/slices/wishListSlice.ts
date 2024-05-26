import { axiosInstance } from "@/config/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type WishListItem = {
  productId: any;
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
};

type WishListState = {
  items: WishListItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const getInitialWishListState = (): WishListItem[] => {
  if (typeof window !== "undefined") {
    const savedWishList = localStorage.getItem("wishlist");
    if (savedWishList) {
      try {
        return JSON.parse(savedWishList);
      } catch (e) {
        console.error("Error parsing wishlist from localStorage", e);
        return [];
      }
    }
  }
  return [];
};

// Thunk to fetch wishlist
export const fetchWishList = createAsyncThunk(
  "wishlist/fetchWishList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/wishlist");
      return response.data as WishListItem[];
    } catch (error: any) {
      return rejectWithValue(
        (error.response?.data?.error || "Failed to fetch wishlist") as string
      );
    }
  }
);

// Thunk to add to wishlist
export const addWishList = createAsyncThunk(
  "wishlist/addWishList",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/wishlist", { productId });
      return response.data as WishListItem[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to add item to wishlist"
      );
    }
  }
);

// Thunk to remove from wishlist
export const removeWishList = createAsyncThunk(
  "wishlist/removeWishList",
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete("/api/wishlist", {
        data: { productId },
      });
      return response.data as WishListItem[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to remove item from wishlist"
      );
    }
  }
);

const initialState: WishListState = {
  items: getInitialWishListState(),
  status: "idle",
  error: null,
};

const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishList: (state) => {
      state.items = [];
      localStorage.removeItem("wishlist");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchWishList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        localStorage.setItem("wishlist", JSON.stringify(state.items));
      })
      .addCase(fetchWishList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(addWishList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addWishList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        localStorage.setItem("wishlist", JSON.stringify(state.items));
      })
      .addCase(addWishList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(removeWishList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeWishList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        localStorage.setItem("wishlist", JSON.stringify(state.items));
      })
      .addCase(removeWishList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearWishList } = wishListSlice.actions;

export default wishListSlice.reducer;
