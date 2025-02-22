import express from 'express';
import { getAllTodos, createTodo } from '../Controllers/todoController';

const router = express.Router();

router.get('/', getAllTodos);
router.post('/', createTodo);

export default router;
