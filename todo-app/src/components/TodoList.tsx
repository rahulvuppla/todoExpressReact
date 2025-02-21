import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleTodo, deleteTodo, updateTodo, setFilterStatus, setSortBy, Todo } from '../redux/slices/todoSlices';

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const categories = useSelector((state: RootState) => state.categories.categories);
  const filterStatus = useSelector((state: RootState) => state.todos.filterStatus);
  const sortBy = useSelector((state: RootState) => state.todos.sortBy);
  const dispatch = useDispatch();

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editText, setEditText] = useState('');

  const filteredTodos = todos.filter(todo => {
    if (filterStatus === 'active') return !todo.completed;
    if (filterStatus === 'completed') return todo.completed;
    return true;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortBy === 'dueDate') return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

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
      <div style={{ marginBottom: '10px' }}>
        <select onChange={(e) => dispatch(setFilterStatus(e.target.value as any))}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <select onChange={(e) => dispatch(setSortBy(e.target.value as any))} style={{ marginLeft: '10px' }}>
          <option value="createdAt">Sort by Creation Date</option>
          <option value="dueDate">Sort by Due Date</option>
        </select>
      </div>
      {categories.map(category => (
        <div key={category.id} style={{ marginBottom: '20px' }}>
          <h3>{category.name}</h3>
          <ul>
            {sortedTodos
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
                        {todo.title} - Due: {todo.dueDate}
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
