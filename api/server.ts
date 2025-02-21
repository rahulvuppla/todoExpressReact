import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { json } from 'body-parser';
import { nanoid } from 'nanoid';
import { Todo } from './types/todo';

dotenv.config({ path: './config.env' });

const app = express();

app.use(cors());
app.use(json());

// In-memory storage for todos and categories
let todos: Todo[] = [
	{
		id: nanoid(),
		title: "Learn React",
		completed: true
	},
	{
		id: nanoid(),
		title: "Have a Job!",
		completed: false
	}
];

let toggleValue = false;
let categories: string[] = ["General"]; // Default category

// Get all todos
app.get('/todos', (req: Request, res: Response) => {
	res.send(todos);
});

// Create a new todo
app.post('/todos', (req: Request, res: Response) => {
	const todo: Todo = {
		id: nanoid(),
		title: req.body.title,
		description: req.body.description || '',
		dueDate: req.body.dueDate || '',
		completed: false,
		category: req.body.category || 'General'
	};
	todos.push(todo);
	res.status(201).send(todo);
});

// Edit a todo
app.post('/todos/:id', (req: Request, res: Response) => {
	const index = todos.findIndex((todo) => todo.id === req.params.id);
	if (index > -1) {
		todos[index].title = req.body.title || todos[index].title;
		todos[index].description = req.body.description || todos[index].description;
		todos[index].dueDate = req.body.dueDate || todos[index].dueDate;
		todos[index].category = req.body.category || todos[index].category;
	}
	res.send(todos);
});

// Delete a todo
app.delete('/todos/:id', (req: Request, res: Response) => {
	const index = todos.findIndex((todo) => todo.id === req.params.id);
	if (index > -1) todos.splice(index, 1);
	res.status(204).send();
});

// Clear all completed todos
app.delete('/todos', (req: Request, res: Response) => {
	todos = todos.filter(todo => !todo.completed);
	res.status(204).send(true);
});

// Toggle completion status of a todo
app.patch('/todos/:id', (req: Request, res: Response) => {
	const index = todos.findIndex((todo) => todo.id === req.params.id);
	if (index > -1) {
		todos[index].completed = Boolean(req.body.completed);
	}
	res.send(todos[index]);
});

// Toggle all todos
app.post('/todos/toggleAll', (req: Request, res: Response) => {
	toggleValue = Boolean(req.body.itemsLeft);
	todos.forEach(todo => todo.completed = !toggleValue);
	toggleValue = !toggleValue;
	res.send(toggleValue);
});

// Create a new category
app.post('/categories', (req: Request, res: Response) => {
	const category = req.body.category;
	if (category && !categories.includes(category)) {
		categories.push(category);
		res.status(201).send(category);
	} else {
		res.status(400).send('Category already exists or is invalid.');
	}
});

// Get all categories
app.get('/categories', (req: Request, res: Response) => {
	res.send(categories);
});

// Filter todos by completion status
app.get('/todos/filter/:status', (req: Request, res: Response) => {
	const status = req.params.status;
	let filteredTodos: Todo[] = [];

	if (status === 'active') {
		filteredTodos = todos.filter(todo => !todo.completed);
	} else if (status === 'completed') {
		filteredTodos = todos.filter(todo => todo.completed);
	} else {
		filteredTodos = todos;
	}

	res.send(filteredTodos);
});

// Sort todos by due date or creation date
app.get('/todos/sort/:type', (req: Request, res: Response) => {
	const type = req.params.type;

	if (type === 'dueDate') {
		todos.sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime());
	} else if (type === 'creationDate') {
		todos.sort((a, b) => a.id.localeCompare(b.id));
	}

	res.send(todos);
});

const PORT = process.env.PORT || 7001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
