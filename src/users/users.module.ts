import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { ExampleMiddleware } from './middlewares/Example/example.middleware';
import { TestMiddleware } from './middlewares/test/test.middleware';

@Module({
	controllers: [UsersController],
	providers: [UsersService],
})
export class UsersModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		// consumer.apply(ExampleMiddleware).forRoutes(UsersController);
		consumer
			.apply(ExampleMiddleware)
			.forRoutes(
				{
					path: 'users',
					method: RequestMethod.GET,
				},
				{
					path: 'users/:id/:postId',
					method: RequestMethod.GET,
				},
				// {
				// 	path: '*',
				// 	method: RequestMethod.ALL,
				// },
			)
			.apply(TestMiddleware)
			.forRoutes({
				path: 'users/create',
				method: RequestMethod.POST,
			});
	}
}
