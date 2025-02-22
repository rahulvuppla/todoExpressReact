// src/redux/store.ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import categoryReducer, { CategoryState } from './slices/categorySlices';
import todoReducer from './slices/todoSlices';

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    todos: todoReducer,
  },
});

// ✅ Correctly define RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
