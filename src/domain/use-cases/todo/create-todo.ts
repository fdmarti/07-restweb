import { CreateTodoDto } from '../../dtos';
import { TodoEntity } from '../../entities';
import { TodoRepository } from '../../repositories';

export interface CreateTodoUseCases {
	execute(dto: CreateTodoDto): Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCases {
	constructor(
        private readonly repository: TodoRepository
        ){}

	execute(dto: CreateTodoDto): Promise<TodoEntity> {
		return this.repository.create(dto);
	}
}
