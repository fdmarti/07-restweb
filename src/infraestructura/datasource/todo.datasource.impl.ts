import { prisma } from '../../data/postgres';
import {
	CreateTodoDto,
	TodoDataSource,
	TodoEntity,
	UpdateTodoDto,
} from '../../domain';

export class TodoDataSourceImplementation implements TodoDataSource {
	async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
		const newTodo = await prisma.todo.create({
			data: createTodoDto!,
		});

		return TodoEntity.fromObject(newTodo);
	}
	async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
		await this.findById(updateTodoDto.id);

		const todoUpdate = await prisma.todo.update({
			where: { id: updateTodoDto.id },
			data: updateTodoDto!.values,
		});

		return TodoEntity.fromObject(todoUpdate);
	}
	async delete(id: string): Promise<TodoEntity> {
		if (!id) throw 'Should be a valid ID';

		const todo = this.findById(id);
		if (!todo) throw `TODO with the ID ${id} does not exists`;

		const todoDeleted = await prisma.todo.delete({
			where: { id },
		});

		return TodoEntity.fromObject(todoDeleted);
	}
	async findById(id: string): Promise<TodoEntity> {
		const todo = await prisma.todo.findFirst({
			where: {
				id,
			},
		});

		if (!todo) throw `TODO with the id ${id} not found`;
		return TodoEntity.fromObject(todo);
	}
	async getAll(): Promise<TodoEntity[]> {
		const todos = await prisma.todo.findMany();
		return todos.map((todo) => TodoEntity.fromObject(todo));
	}
}
