import { Request, Response } from 'express';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, Res, UsePipes, ValidationPipe, ParseBoolPipe, HttpException, HttpStatus, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
	constructor(private userService: UsersService) {}

	@Get('') // get decorator from nest which takes an argument as the route endpoint
	getUsers(@Query('sortBy') sortBy: string, @Query('sortDesc', ParseBoolPipe) sortDesc: boolean) {
		return this.userService.fetchUsers();
	}

	@Get('posts')
	getUsersPosts() {
		return [
			{
				username: 'Bruce',
				email: 'bruce@avengers.com',
				posts: [
					{
						id: 1,
						title: 'Post 1',
					},
					{
						id: 2,
						title: 'Post 2',
					},
				],
			},
		];
	}

	@Get('posts/comments')
	getUsersPostsComments() {
		return [
			{
				id: 1,
				title: 'Posts',
				comments: [],
			},
		];
	}

	@Post('create')
	@UsePipes(new ValidationPipe())
	async createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
		console.log(userData);
		const response: object = await this.userService.createUser(userData);
		return response;
	}

	// access route params
	@Get(':id/:postId')
	getUserById(@Param('id', ParseIntPipe) id: string, @Param('postId') postId: string) {
		const user = this.userService.fetchUserById(id);

		if (!user) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}

		return user;
	}
}
