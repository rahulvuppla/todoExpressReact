// src/redux/slices/categorySlices.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Category {
  id: number;
  name: string;
}

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// Thunks with explicit types
export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetchCategories',
  async () => {
    const response = await axios.get('http://localhost:5000/api/categories');
    return response.data;
  }
);

export const addCategory = createAsyncThunk<Category, string>(
  'categories/addCategory',
  async (name) => {
    const response = await axios.post('http://localhost:5000/api/categories', { name });
    return response.data;
  }
);

export const deleteCategory = createAsyncThunk<number, number>(
  'categories/deleteCategory',
  async (id) => {
    await axios.delete(`http://localhost:5000/api/categories/${id}`);
    return id;
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
      state.loading = false;
    });
    builder.addCase(addCategory.fulfilled, (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    });
    builder.addCase(deleteCategory.fulfilled, (state, action: PayloadAction<number>) => {
      state.categories = state.categories.filter(category => category.id !== action.payload);
    });
  },
});

export default categorySlice.reducer;
