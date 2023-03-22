import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
	use(req: any, res: any, next: () => void) {
		// console.log(req.query);
		// console.log(req.params);
		const { authorization } = req.headers;

		if (!authorization || authorization.toLowerCase() !== 'yes') {
			throw new HttpException('No token provided!', HttpStatus.FORBIDDEN);
		}

		next();
	}
}
