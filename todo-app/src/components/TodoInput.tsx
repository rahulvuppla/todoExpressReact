// src/components/TodoInput.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { addTodo } from '../redux/slices/todoSlices';
import { fetchCategories, Category } from '../redux/slices/categorySlices';
import './TodoInput.css';

const TodoInput: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [categoryId, setCategoryId] = useState<number>(0);

  const categories: Category[] = useSelector((state: RootState) => state.categories.categories);
  // Use AppDispatch here as well
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (title.trim() && categoryId) {
      dispatch(addTodo({ title, description, dueDate, categoryId }));
      setTitle('');
      setDescription('');
      setDueDate('');
      setCategoryId(0);
    }
  };

  return (
    <div className="todo-input">
      <h2>Add New Todo</h2>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Title" 
      />
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description"
      />
      <input 
        type="date" 
        value={dueDate} 
        onChange={(e) => setDueDate(e.target.value)} 
      />
      <select value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))}>
        <option value={0}>Select Category</option>
        {categories.length > 0 ? (
          categories.map((category: Category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))
        ) : (
          <option>Loading...</option>
        )}
      </select>
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};

export default TodoInput;
