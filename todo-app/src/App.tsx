import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import TodoInput from './components/TodoInput';
import CategoryManager from './components/CategoryManager';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div style={{ padding: '20px' }}>
        <h1>Todo App</h1>
        <CategoryManager />
        <TodoInput />
        <TodoList />
      </div>
    </Provider>
  );
};

export default App;
