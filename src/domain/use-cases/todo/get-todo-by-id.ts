import { TodoEntity } from '../../entities';
import { TodoRepository } from '../../repositories';

export interface GetTodoByIdUseCases {
	execute(id : string): Promise<TodoEntity>;
}

export class GetTodo implements GetTodoByIdUseCases {
	constructor(
        private readonly repository: TodoRepository
        ){}

	execute(id : string): Promise<TodoEntity> {
		return this.repository.findById(id)
	}
}
