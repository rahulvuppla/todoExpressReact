import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import TodoInput from './components/TodoInput';
import CategoryManager from './components/CategoryManager';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="main-container" style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>Todo App</h1>
        <CategoryManager />
        <TodoInput />
        <TodoList />
      </div>
    </Provider>
  );
};

export default App;
