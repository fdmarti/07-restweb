import express from 'express';
import path from 'path';

interface Options {
	port: number;
	public_path?: string;
}

export class Server {
	private app = express();
	private readonly port: number;
	private readonly public_path: string;

	constructor(options: Options) {
		const { port, public_path = 'public' } = options;
		this.port = port;
		this.public_path = public_path;
	}

	async start() {
		//* Middlewares

		// *Public Folder
		this.app.use(express.static(this.public_path));

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
