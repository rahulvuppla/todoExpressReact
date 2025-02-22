import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  categoryId: number;
  createdAt: string;
}

export interface TodoState {
  todos: Todo[];
  filterStatus: 'all' | 'active' | 'completed';
  sortBy: 'dueDate' | 'createdAt';
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  filterStatus: 'all',
  sortBy: 'createdAt',
  loading: false,
  error: null
};

// Async thunk to fetch todos from backend
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('http://localhost:5000/api/todos');
  return response.data;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Omit<Todo, 'id' | 'completed' | 'createdAt'>>) => {
      const newTodo: Todo = {
        id: Date.now(),
        completed: false,
        createdAt: new Date().toISOString(),
        ...action.payload
      };
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    setFilterStatus: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
      state.filterStatus = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'dueDate' | 'createdAt'>) => {
      state.sortBy = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch todos';
      });
  }
});

export const { addTodo, toggleTodo, deleteTodo, updateTodo, setFilterStatus, setSortBy } = todoSlice.actions;
export default todoSlice.reducer;
