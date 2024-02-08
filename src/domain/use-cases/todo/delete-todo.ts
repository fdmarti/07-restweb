import { TodoEntity } from '../../entities';
import { TodoRepository } from '../../repositories';

export interface DeleteTodoUseCases {
	execute(id: string): Promise<TodoEntity>;
}

export class DeleteTodo implements DeleteTodoUseCases {
	constructor(
        private readonly repository: TodoRepository
        ){}

	execute(id : string): Promise<TodoEntity> {
		return this.repository.delete(id);
	}
}
