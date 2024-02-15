import { Request, Response } from 'express';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import {
	CreateTodo,
	DeleteTodo,
	GetTodo,
	GetTodosAll,
	TodoRepository,
	UpdateTodo,
} from '../../domain';

export class TodosController {
	constructor(private readonly todoRepository: TodoRepository) {}

	public getTodos = (req: Request, res: Response) => {
		new GetTodosAll(this.todoRepository)
			.execute()
			.then((todos) => {
				return res.json({
					todos,
					amount: todos.length,
					completed: todos.filter((todo) => todo.completedAt).length,
				});
			})
			.catch((error) => {
				res.status(400).json({ error });
			});
	};

	public getTodoById = (req: Request, res: Response) => {
		const id = req.params.id;

		new GetTodo(this.todoRepository)
			.execute(id)
			.then((todo) => {
				return res.status(200).json(todo);
			})
			.catch((error) => {
				return res.status(404).json({
					error,
				});
			});
	};

	public createTodo = (req: Request, res: Response) => {
		const [error, createTodoDto] = CreateTodoDto.create(req.body);
		if (error) return res.status(400).json({ error });

		new CreateTodo(this.todoRepository)
			.execute(createTodoDto!)
			.then((todo) => res.status(201).json(todo))
			.catch((error) =>
				res.status(404).json({
					error,
				}),
			);
	};

	public updateTodo = (req: Request, res: Response) => {
		const id = req.params.id;
		const [error, updateTodoDto] = UpdateTodoDto.create({
			...req.body,
			id,
		});

		if (error) return res.status(404).json({ error });

		new UpdateTodo(this.todoRepository)
			.execute(updateTodoDto!)
			.then((todo) => res.status(200).json(todo))
			.catch((error) => res.status(404).json({ error }));
	};

	public deleteTodo = (req: Request, res: Response) => {
		const id = req.params.id;

		new DeleteTodo(this.todoRepository)
			.execute(id)
			.then((todo) => res.json({ todo }))
			.catch((error) => res.status(404).json({ error }));
	};
}
