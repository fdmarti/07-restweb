import { UpdateTodoDto } from '../../dtos';
import { TodoEntity } from '../../entities';
import { TodoRepository } from '../../repositories';

export interface UpdateTodoUseCases {
	execute(dto: UpdateTodoDto): Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUseCases {
	constructor(
        private readonly repository: TodoRepository
        ){}

	execute(dto: UpdateTodoDto): Promise<TodoEntity> {
		return this.repository.update(dto);
	}
}
