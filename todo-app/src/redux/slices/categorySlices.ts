import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Category {
  id: number;
  name: string;
}

export interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: []
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<string>) => {
      const newCategory: Category = {
        id: Date.now(),
        name: action.payload
      };
      state.categories.push(newCategory);
    }
  }
});

export const { addCategory } = categorySlice.actions;
export default categorySlice.reducer;
