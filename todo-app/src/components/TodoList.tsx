import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';

import { RootState } from '../redux/store';
import { toggleTodo, deleteTodo, updateTodo, setFilterStatus, setSortBy, Todo,fetchTodos} from '../redux/slices/todoSlices';
import './TodoList.css'

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const categories = useSelector((state: RootState) => state.categories.categories);
  const filterStatus = useSelector((state: RootState) => state.todos.filterStatus);
  const sortBy = useSelector((state: RootState) => state.todos.sortBy);
  const dispatch = useDispatch<AppDispatch>();


  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editText, setEditText] = useState('');
  const [editDesc,setEditDesc]=useState('')
  const [editCategory,setEditCategory]=useState<number | null>(null)
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

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
    setEditDesc(todo.description);
    setEditCategory(todo.categoryId);
  };

  const handleUpdate = () => {
    if (editingTodo && editText.trim() !== '') {
      dispatch(updateTodo({ ...editingTodo, title: editText ,description:editDesc, categoryId:editCategory || editingTodo.categoryId}));
      setEditingTodo(null);
      setEditText('');
      setEditCategory(null)
    }
  };
  const getCategoryName = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Uncategorized';
  };

 

  return (
    <div style={{ marginTop: '20px' }} className="todo-list">
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
      </div><ul>
      {sortedTodos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
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
                <input 
                  type="text" 
                  value={editDesc} 
                  onChange={(e) => setEditDesc(e.target.value)} 
                />
                <select 
                value={editCategory || ''}
                onChange={(e) =>  setEditCategory(Number(e.target.value))}>
                  <option>Select Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>


                                <div className="todo-actions">

                <button  className="update"  onClick={handleUpdate}>Update</button>
                <button  className="cancel"  onClick={() => setEditingTodo(null)}>Cancel</button> </div>
              </>
            ) : (
              <>
                <span className="todo-text">
   <span style={{ marginLeft: '8px' }}>{todo.title}</span>
   <span style={{ marginLeft: '16px' }}>Description : {todo.description}</span>

  <span style={{ marginLeft: '16px' }}>- Due: {todo.dueDate}</span>
  <span style={{ marginLeft: '16px' }}>- Category: {getCategoryName(todo.categoryId)}</span>
</span>

                <div className="todo-actions">
                  <button className="edit" onClick={() => handleEdit(todo)}>Edit</button>
                  <button className="delete" onClick={() => handleDelete(todo.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}</ul>
    </div>
  );
};

export default TodoList;
