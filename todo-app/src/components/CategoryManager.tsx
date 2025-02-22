// src/components/CategoryManager.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchCategories, addCategory, Category } from '../redux/slices/categorySlices';

const CategoryManager: React.FC = () => {
  // Use AppDispatch for TypeScript to recognize AsyncThunk
  const dispatch: AppDispatch = useDispatch();
  const categories: Category[] = useSelector((state: RootState) => state.categories.categories);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    // Now TypeScript knows the correct type for fetchCategories
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      dispatch(addCategory(newCategory))
        .unwrap()
        .then(() => setNewCategory(''));
    }
  };

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category: Category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
      <input 
        type="text" 
        placeholder="New Category" 
        value={newCategory} 
        onChange={(e) => setNewCategory(e.target.value)} 
      />
      <button onClick={handleAddCategory}>Add Category</button>
    </div>
  );
};

export default CategoryManager;
