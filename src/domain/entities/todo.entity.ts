export class TodoEntity {
	constructor(
		public id: number,
		public text: string,
		public createdAt: Date,
		public completedAt?: Date | null,
	) {}

	get isCompleted() {
		return !!this.completedAt;
	}

	public static fromObject(obj: { [key: string]: any }): TodoEntity {
		const { id, text, createdAt, completedAt } = obj;
		if (!id) throw 'ID is required';
		if (!text) throw 'Text is required';

		let createdAtDate, completedAtDate;

		if (createdAt) createdAtDate = new Date(createdAt);
		if (completedAt) completedAtDate = new Date(completedAt);

		return new TodoEntity(id, text, createdAt, completedAt);
	}
}
