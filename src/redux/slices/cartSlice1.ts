import { axiosInstance } from '@/utils/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  weight: number;
}

type CartState = {
  items: CartItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: CartState = {
  items: [],
  status: 'idle',
  error: null,
};

// Thunks 
export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId: string) => {
    const response = await axiosInstance.get(`/api/cart/get?userId=${userId}`);
    return response.data;
  });
  
  export const addToCart = createAsyncThunk('cart/addToCart', async (cartData: { userId: string, productId: string, quantity: number }) => {
    const response = await axiosInstance.post('/api/cart/add', cartData);
    return response.data;
  });
  
  export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (cartData: { userId: string, productId: string }) => {
    const response = await axiosInstance.delete('/api/cart/remove', { data: cartData });
    return response.data;
  });
  
  export const updateCartItem = createAsyncThunk('cart/updateCartItem', async (cartData: { userId: string, productId: string, quantity: number }) => {
    const response = await axiosInstance.put('/api/cart/update', cartData);
    return response.data;
  });


  const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

          .addCase(fetchCart.pending, (state) => {
            state.status = 'loading';
          })
          
          .addCase(fetchCart.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload.items;
          })
          
          .addCase(fetchCart.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? null;
          })

          .addCase(addToCart.fulfilled, (state, action) => {
            state.items = action.payload.items;
          })

          .addCase(removeFromCart.fulfilled, (state, action) => {
            state.items = action.payload.items;
          })
          
          .addCase(updateCartItem.fulfilled, (state, action) => {
            state.items = action.payload.items;
          });
        }
  });