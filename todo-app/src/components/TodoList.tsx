import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleTodo, deleteTodo, updateTodo, Todo } from '../redux/slices/todoSlices';

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const categories = useSelector((state: RootState) => state.categories.categories);
  const dispatch = useDispatch();

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editText, setEditText] = useState('');

  const handleToggle = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setEditText(todo.title);
  };

  const handleUpdate = () => {
    if (editingTodo && editText.trim() !== '') {
      dispatch(updateTodo({ ...editingTodo, title: editText }));
      setEditingTodo(null);
      setEditText('');
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Todo List</h2>
      {categories.map(category => (
        <div key={category.id} style={{ marginBottom: '20px' }}>
          <h3>{category.name}</h3>
          <ul>
            {todos
              .filter(todo => todo.categoryId === category.id)
              .map(todo => (
                <li key={todo.id}>
                  <input 
                    type="checkbox" 
                    checked={todo.completed} 
                    onChange={() => handleToggle(todo.id)} 
                  />
                  {editingTodo?.id === todo.id ? (
                    <>
                      <input 
                        type="text" 
                        value={editText} 
                        onChange={(e) => setEditText(e.target.value)} 
                      />
                      <button onClick={handleUpdate}>Update</button>
                      <button onClick={() => setEditingTodo(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        {todo.title}
                      </span>
                      <button onClick={() => handleEdit(todo)}>Edit</button>
                    </>
                  )}
                  <button onClick={() => handleDelete(todo.id)}>Delete</button>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
