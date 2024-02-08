import { Request, Response } from 'express';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { TodoRepository } from '../../domain';

export class TodosController {
	constructor(
		private readonly todoRepository: TodoRepository
	) {}

	public getTodos = async (req: Request, res: Response) => {
		const todos = await this.todoRepository.getAll();
		return res.json({
			todos,
			amount: todos.length,
			completed: todos.filter((todo) => todo.completedAt).length,
		});
	};

	public getTodoById = async (req: Request, res: Response) => {
		const id = req.params.id;

		try {
			const todo = await this.todoRepository.findById(id);
			return res.status(200).json(todo);
		} catch (error) {
			return res.status(404).json({
				error: `ID ${id} was not found`,
			});
		}
	};

	public createTodo = async (req: Request, res: Response) => {
		const [error, createTodoDto] = CreateTodoDto.create(req.body);
		if (error) return res.status(400).json({ error });

		const newTodo = await this.todoRepository.create(createTodoDto!);
		return res.status(200).json(newTodo);
	};

	public updateTodo = async (req: Request, res: Response) => {
		const id = req.params.id;
		const [error, updateTodoDto] = UpdateTodoDto.create({
			...req.body,
			id,
		});

		if (error) return res.status(404).json({ error });

		try {
			const todoUpdate = await this.todoRepository.update(updateTodoDto!);
			return res.status(200).json(todoUpdate);
		} catch (error) {
			return res.status(404).json({
				error: `ID ${id} was not found`,
			});
		}
	};

	public deleteTodo = async (req: Request, res: Response) => {
		const id = req.params.id;

		const deletedTodo = await this.todoRepository.delete(id);
		return res.json(deletedTodo);
	};
}
