import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';
import { TodoEntity } from '../../../src/domain';

describe('Todo/routes', () => {
	beforeAll(async () => {
		await testServer.start();
	});

	afterAll(async () => {
		await prisma.todo.deleteMany({});
		await testServer.close();
	});

	const todoExample1 = { text: 'Hola mundo 1' };
	const todoExample2 = { text: 'Hola mundo 2' };

	test('Should return TODOs', async () => {
		await prisma.todo.createMany({
			data: [todoExample1, todoExample2],
		});

		const response = await request(testServer.app)
			.get('/api/todos')
			.expect(200);

		const { todos, amount } = response.body;
		expect(todos).toBeInstanceOf(Array);
		expect(amount).toBe(2);
	});

	test('Should get a TODO by ID', async () => {
		const newTodo = await prisma.todo.create({
			data: {
				text: 'Test TODO to get by ID',
			},
		});

		const { id, text } = newTodo;

		const response = await request(testServer.app)
			.get('/api/todos/' + id)
			.expect(200);

		expect(response.body.text).toEqual(text);
		expect(response.body).toBeInstanceOf(Object);
	});

	test('Should return error if TODO does not exists', async () => {
		const todoFakeID = '1290348129038asdsiadud';

		const response = await request(testServer.app)
			.get('/api/todos/' + todoFakeID)
			.expect(404);

		const { error } = response.body;
		expect(error).toBe(`TODO with the id ${todoFakeID} not found`);
	});

	test('Should create a TODO', async () => {
		const fakeTodo = { text: 'Test Todo' };
		const response = await request(testServer.app)
			.post('/api/todos/')
			.send(fakeTodo)
			.expect(201);

		expect(response.body).toEqual({
			id: expect.any(String),
			text: fakeTodo.text,
			createdAt: expect.any(String),
			completedAt: null,
		});
	});

	test('Should return error at create a TODO', async () => {
		const response = await request(testServer.app)
			.post('/api/todos/')
			.send({})
			.expect(400);

		const { error } = response.body;
		expect(error).toBe('Text property is required');
	});

	test('Should update a TODO', async () => {
		const fakeTodo = await prisma.todo.create({
			data: { text: 'Test Todo update' },
		});

		const { body } = await request(testServer.app)
			.put(`/api/todos/${(await fakeTodo).id}`)
			.send({
				text: 'This todo was changed',
			})
			.expect(200);

		expect(body.text).toBe('This todo was changed');
	});

	test('Should delete a TODO', async () => {
		const fakeTodoDeleted = await prisma.todo.create({
			data: { text: 'Test Todo delete' },
		});

		await request(testServer.app)
			.delete(`/api/todos/${(await fakeTodoDeleted).id}`)
			.expect(200);
	});
});
