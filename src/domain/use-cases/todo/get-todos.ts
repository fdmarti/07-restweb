import { TodoEntity } from '../../entities';
import { TodoRepository } from '../../repositories';

export interface GetTodosUseCases {
	execute(): Promise<TodoEntity[]>;
}

export class GetTodosAll implements GetTodosUseCases {
	constructor(
        private readonly repository: TodoRepository
        ){}

	execute(): Promise<TodoEntity[]> {
		return this.repository.getAll();
	}
}
