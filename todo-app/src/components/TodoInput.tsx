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
  const [inputErrors, setInputErrors] = useState({
    title: false,
    description: false,
    dueDate: false,
    categoryId: false,
  });
  const categories: Category[] = useSelector((state: RootState) => state.categories.categories);
  // Use AppDispatch here as well
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddTodo = () => {
    const errors = {
      title: !title.trim(),
      description: !description.trim(),
      dueDate: !dueDate,
      categoryId: categoryId === 0,
    };
  
    setInputErrors(errors);
  
    if (Object.keys(errors).map(key => errors[key as keyof typeof errors]).some(error => error)) {
      return;
    }

    if (title.trim() && categoryId) {
      dispatch(addTodo({ title, description, dueDate, categoryId }));
      setTitle('');
      setDescription('');
      setDueDate('');
      setCategoryId(0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if(e.key === 'Enter'){
        e.preventDefault()
        handleAddTodo()
      }
    }

  return (
    <form onSubmit={handleAddTodo}>
    <div className="todo-input">
      <h2>Add New Todo</h2>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => {
          setTitle(e.target.value);
          setInputErrors({ ...inputErrors, title: false });
        }} 
        placeholder="Title" 
        style={{
          borderColor: inputErrors.title ? 'red' : '',
          outline: inputErrors.title ? 'red' : ''
        }}
        onKeyDown={handleKeyDown}
      />
      <textarea 
        value={description} 
        onChange={(e) => {
          setDescription(e.target.value);
          setInputErrors({ ...inputErrors, description: false });
        }} 
        placeholder="Description"
        style={{
          borderColor: inputErrors.description ? 'red' : '',
          outline: inputErrors.description ? 'red' : ''
        }}
        onKeyDown={handleKeyDown}
      />
      <input 
        type="date" 
        value={dueDate} 
        onChange={(e) => {
          setDueDate(e.target.value);
          setInputErrors({ ...inputErrors, dueDate: false });
        }} 
        style={{
          borderColor: inputErrors.dueDate ? 'red' : '',
          outline: inputErrors.dueDate ? 'red' : ''
        }}
        onKeyDown={handleKeyDown}
      />
      <select value={categoryId} onChange={(e) => {
        setCategoryId(Number(e.target.value));
        setInputErrors({ ...inputErrors, categoryId: false });
      }}
      style={{
        borderColor: inputErrors.categoryId ? 'red' : '',
        outline: inputErrors.categoryId ? 'red' : ''
      }}>
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
    </form>
  );
};

export default TodoInput;
