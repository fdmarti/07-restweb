import { envs } from '../src/config/env';
import { Server } from '../src/presentation/server';

jest.mock('../src/presentation/server');

describe('App.ts', () => {
	test('Server should start', async () => {
		await import('../src/app');
		expect(Server).toHaveBeenCalledTimes(1);
		expect(Server).toHaveBeenCalledWith({
			port: envs.PORT,
			public_path: envs.PUBLIC_PATH,
			routes: expect.any(Function),
		});

		expect(Server.prototype.start).toHaveBeenCalled();
	});
});
