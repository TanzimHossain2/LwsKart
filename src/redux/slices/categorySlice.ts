import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CategoryState = {
  selectedCategories: string[];
};

const initialState: CategoryState = {
  selectedCategories: [],
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    selectCategory(state, action: PayloadAction<{ categoryId: string; isChecked: boolean }>) {
      const { categoryId, isChecked } = action.payload;
      if (isChecked) {
        state.selectedCategories.push(categoryId);
      } else {
        state.selectedCategories = state.selectedCategories.filter(id => id !== categoryId);
      }
    },
  },
});

export const { selectCategory } = categorySlice.actions;

export default categorySlice.reducer;
