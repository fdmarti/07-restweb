import {
	CreateTodoDto,
	TodoDataSource,
	TodoEntity,
	TodoRepository,
	UpdateTodoDto,
} from '../../domain';

export class TodoRepositoryImplementation implements TodoRepository {
	constructor(
        private readonly datasource: TodoDataSource
    ) {}

	create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
		return this.datasource.create(createTodoDto);
	}
	update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
		return this.datasource.update(updateTodoDto);
	}
	delete(id: string): Promise<TodoEntity> {
		return this.datasource.delete(id);
	}
	findById(id: string): Promise<TodoEntity> {
		return this.datasource.findById(id);
	}
	getAll(): Promise<TodoEntity[]> {
		return this.datasource.getAll();
	}
}
