import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlices';
import categoryReducer from './slices/categorySlices';

const store = configureStore({
  reducer: {
    todos: todoReducer,
    categories: categoryReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
