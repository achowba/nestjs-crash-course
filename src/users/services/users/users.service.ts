import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/users/utils/types';

@Injectable()
export class UsersService {
	private fakeUsers = [
		{ id: 1, username: 'Modric', email: 'modric@soccer.com' },
		{ id: 2, username: 'Kroos', email: 'kroos@soccer.com' },
		{ id: 3, username: 'Benzema', email: 'benzema@soccer.com' },
	];

	fetchUsers() {
		return this.fakeUsers;
	}

	async createUser(userDetails: CreateUserType) {
		const lastId: number = this.fakeUsers[this.fakeUsers.length - 1].id;

		this.fakeUsers.push({
			id: lastId + 1,
			...userDetails,
		});

		return {
			message: 'User created successfully',
			data: {
				id: lastId + 1,
				...userDetails,
			},
		};
	}

	fetchUserById(id) {
		return this.fakeUsers.find((user) => user.id === id);

		// if (!user) {
		// 	throw new Error('User not found!');
		// }

		// return user;
	}
}
