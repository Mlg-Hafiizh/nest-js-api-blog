import { UserRole, UserStatus } from 'src/users/users.enum';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class SignUpDto {
	@IsNotEmpty({ message: 'Name is required' })
	@IsString({ message: 'Name must be a string' })
	name: string;

	@IsNotEmpty({ message: 'Email is required' })
	@IsEmail()
	email: string;

	@Type(() => String)
	@IsNotEmpty({ message: 'Password is required' })
	@IsString()
	@MinLength(6)
	password: string;

	role?: UserRole;

	status?: UserStatus;
}
