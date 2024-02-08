import { Router } from 'express';
import { TodosController } from './controller';
import { TodoDataSourceImplementation } from '../../infraestructura/datasource/todo.datasource.impl';
import { TodoRepositoryImplementation } from '../../infraestructura/repositories/todo.repository.impl';

export class TodoRoutes {
	static get routes(): Router {
		const router = Router();
		const datasource = new TodoDataSourceImplementation();
		const todoRepository = new TodoRepositoryImplementation(datasource);
		const todoController = new TodosController(todoRepository);
		
		router.get('/', todoController.getTodos);
		router.get('/:id', todoController.getTodoById);
		router.post('/', todoController.createTodo);
		router.put('/:id', todoController.updateTodo);
		router.delete('/:id', todoController.deleteTodo);

		return router;
	}
}
