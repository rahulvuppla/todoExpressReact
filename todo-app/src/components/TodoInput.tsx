import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addTodo } from '../redux/slices/todoSlices';
import './TodoInput.css';

const TodoInput: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [categoryId, setCategoryId] = useState<number>(0);

  const categories = useSelector((state: RootState) => state.categories.categories);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (title.trim() && categoryId) {
      dispatch(addTodo({ title, description, dueDate, categoryId }));
      setTitle('');
      setDescription('');
      setDueDate('');
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
      <select onChange={(e) => setCategoryId(Number(e.target.value))}>
        <option value={0}>Select Category</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};

export default TodoInput;
