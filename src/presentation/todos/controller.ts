import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

interface Todo {
	id: string;
	text: string;
	completedAt: Date;
}

const todos: Todo[] = [
	{ id: uuidv4(), text: 'Buy something', completedAt: new Date() },
	{ id: uuidv4(), text: 'Buy something another', completedAt: new Date() },
	{ id: uuidv4(), text: 'Buy something better', completedAt: new Date() },
	{ id: uuidv4(), text: 'Buy something better', completedAt: new Date() },
	{ id: uuidv4(), text: 'Buy something better', completedAt: new Date() },
	{ id: uuidv4(), text: 'Buy something better', completedAt: new Date() },
];

export class TodosController {
	constructor() {}

	public getTodos = (req: Request, res: Response) => {
		return res.json(todos);
	};

	public getTodoById = (req: Request, res: Response) => {
		const id = req.params.id;

		const todo = todos.find((todo) => todo.id === id);

		if (todo) {
			return res.status(200).json(todo);
		} else {
			return res.status(404).json({
				error: `ID ${id} was not found`,
				message: 'Not found',
			});
		}
	};

	public createTodo = (req: Request, res: Response) => {
		const { text } = req.body;

		if (!text)
			return res
				.status(400)
				.json({ error: 'The text value should have more than 3 letters' });

		const newTodo: Todo = {
			id: uuidv4(),
			text,
			completedAt: new Date(),
		};

		todos.push(newTodo);
		return res.status(200).json(newTodo);
	};

	public updateTodo = (req: Request, res: Response) => {
		const id = req.params.id;

		const todo = todos.find((todo) => todo.id === id);

		if (!todo)
			return res.status(404).json({ error: `TODO with id ${id} not found` });

		const { text } = req.body;

		if (!text)
			return res
				.status(400)
				.json({ error: 'The text value should have more than 3 letters' });

		todo.text = text;

		res.status(200).json(todo);
	};

	public deleteTodo = (req: Request, res: Response) => {
		const id = req.params.id;
		const todo = todos.find((todo) => todo.id === id);

		if (!todo)
			return res.status(404).json({ error: `TODO with id ${id} not found` });

		todos.splice(todos.indexOf(todo), 1);
		res.json(todo)
	};
}
