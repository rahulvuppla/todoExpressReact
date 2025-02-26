// src/components/CategoryManager.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchCategories, addCategory, Category, deleteCategory } from '../redux/slices/categorySlices';
import './CategoryManager.css'

const CategoryManager: React.FC = () => {
  // Use AppDispatch for TypeScript to recognize AsyncThunk
  const dispatch: AppDispatch = useDispatch();
  const categories: Category[] = useSelector((state: RootState) => state.categories.categories);
  const [newCategory, setNewCategory] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);


  useEffect(() => {
    // Now TypeScript knows the correct type for fetchCategories
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      setIsInvalid(true);
      return;
    }
    else if (newCategory.trim()) {
      setIsInvalid(false);

      dispatch(addCategory(newCategory))
        .unwrap()
        .then(() => setNewCategory(''));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      handleAddCategory()
    }
  }
  const handleDeleteCategory = (categoryId: number) => {
    if(window.confirm("Are you sure")){
      dispatch(deleteCategory(categoryId))
    }
  }
  return (
    <div className="category-manager">
      <h2>Categories</h2>
      <ul>
        {categories.map((category: Category) => (
          <li key={category.id}>{category.name}
          
          <button onClick={()=> handleDeleteCategory(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="New Category"
        value={newCategory}
        onChange={(e) => {setNewCategory(e.target.value);setIsInvalid(false);}}
        style={{
          borderColor: isInvalid ? 'red' : '',
          outline: isInvalid ? 'red' : ''
        }}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleAddCategory}>Add Category</button>
    </div>
  );
};

export default CategoryManager;
