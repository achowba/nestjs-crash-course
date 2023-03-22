import { ExampleMiddleware } from './example.middleware';

describe('AuthMiddleware', () => {
	it('should be defined', () => {
		expect(new ExampleMiddleware()).toBeDefined();
	});
});
