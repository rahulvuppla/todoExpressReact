import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../redux/slices/categorySlices';
import { RootState } from '../redux/store';
import './CategoryManager.css';

const CategoryManager: React.FC = () => {
  const [categoryName, setCategoryName] = useState('');
  const categories = useSelector((state: RootState) => state.categories.categories);
  const dispatch = useDispatch();

  const handleAddCategory = () => {
    if (categoryName.trim() !== '') {
      dispatch(addCategory(categoryName));
      setCategoryName('');
    }
  };

  return (
    <div className="category-manager">
      <h2>Manage Categories</h2>
      <input 
        type="text" 
        value={categoryName} 
        onChange={(e) => setCategoryName(e.target.value)} 
        placeholder="New Category" 
      />
      <button onClick={handleAddCategory}>Add Category</button>

      <ul>
        {categories.map(category => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;
