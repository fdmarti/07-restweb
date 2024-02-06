import express, { Router } from 'express';
import path from 'path';

interface Options {
	port: number;
	public_path?: string;
	routes: Router;
}

export class Server {
	private app = express();
	private readonly port: number;
	private readonly public_path: string;
	private readonly routes: Router;

	constructor(options: Options) {
		const { port, public_path = 'public', routes } = options;
		this.port = port;
		this.public_path = public_path;
		this.routes = routes;
	}

	async start() {
		//* Middlewares
		this.app.use(express.json()); //raw

		// *Public Folder
		this.app.use(express.static(this.public_path));

		//* Routes
		this.app.use(this.routes);

		// * SPA
		this.app.get('*', (req, resp) => {
			const indexPath = path.join(
				__dirname + `../../../${this.public_path}/index.html`,
			);
			resp.sendFile(indexPath);
			return;
		});

		const PORT = this.port;
		this.app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	}
}
