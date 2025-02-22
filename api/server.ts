import express from 'express';
import sequelize from './config/database';
import Category from './Models/Category';
import Todo from './models/Todo';

const app = express();
const PORT = 5000;

app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.send('API is working!');
});

// Category Routes
app.get('/api/categories', async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
});

app.post('/api/categories', async (req, res) => {
  const { name } = req.body;
  const newCategory = await Category.create({ name });
  res.status(201).json(newCategory);
});

// Todo Routes
app.get('/api/todos', async (req, res) => {
  const todos = await Todo.findAll();
  res.json(todos);
});

app.post('/api/todos', async (req, res) => {
  const { title, description, dueDate, categoryId } = req.body;
  const newTodo = await Todo.create({ 
    title, 
    description, 
    dueDate, 
    completed: false, 
    categoryId, 
    createdAt: new Date().toISOString() 
  });
  res.status(201).json(newTodo);
});

// Sync Database and Start Server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});
