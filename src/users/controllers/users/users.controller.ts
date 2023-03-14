import { Body, Controller, Get, Param, Post, Query, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Controller('users')
export class UsersController {
	@Get('') // get decorator from nest which takes an argument as the route endpoint
	getUsers(@Query('sortBy') sortBy: string) {
		return {
			username: 'Bruce',
			email: 'bruce@avengers.com',
			sortBy,
		};
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
	createUser(@Body() userData: CreateUserDto) {
		console.log(userData);
		return {};
	}

	// access route params
	@Get(':id/:postId')
	getUserById(@Param('id') id: string, @Param('postId') postId: string) {
		return {
			id,
			postId,
		};
	}
}
