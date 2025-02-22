import { Request, Response } from 'express';
import Todo from '../Models/Todo';

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  const { title, description, dueDate } = req.body;
  try {
    const todo = await Todo.create({ title, description, dueDate });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
};
