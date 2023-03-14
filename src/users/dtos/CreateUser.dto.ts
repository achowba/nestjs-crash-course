import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
	@IsNotEmpty()
	username: string;

	@IsEmail()
	email: string;
}
