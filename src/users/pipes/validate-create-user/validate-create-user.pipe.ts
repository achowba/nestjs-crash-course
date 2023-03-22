import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		console.log('value', value);
		console.log('metadata', metadata);
		const parsedAge = parseInt(value.age);

		if (isNaN(parsedAge)) {
			throw new HttpException(`Invalid Data type for property 'age'. Expected number.`, HttpStatus.UNPROCESSABLE_ENTITY);
		}

		return {
			...value,
			age: parsedAge,
		};
	}
}
