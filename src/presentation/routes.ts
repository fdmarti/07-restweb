import { Router } from 'express';
import { TodoRoutes } from './todos/routes';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		//!  Aca van todas las rutas de la app

		router.use('/api/todos', TodoRoutes.routes);

		return router;
	}
}
