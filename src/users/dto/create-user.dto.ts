import {
	IsNotEmpty,
	IsEmail,
	IsString,
	MinLength,
	MaxLength,
} from 'class-validator';
import { UserRole, UserStatus } from '../users.enum';

export class CreateUserDto {
	@IsNotEmpty({ message: 'Name is required' })
	@IsString({ message: 'Name must be a string' })
	@MinLength(2, { message: 'Name must be at least 2 characters long' })
	@MaxLength(100, { message: 'Name must be at most 100 characters long' })
	name: string;

	@IsEmail({}, { message: 'Email must be a valid email address' })
	email: string;

	@IsNotEmpty({ message: 'Password is required' })
	@IsString({ message: 'Password must be a string' })
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	@MaxLength(100, { message: 'Password must be at most 100 characters long' })
	password: string;

	@IsNotEmpty({ message: 'Role is required' })
	@IsString({ message: 'Role must be a string' })
	role: UserRole;

	@IsNotEmpty({ message: 'Status is required' })
	@IsString({ message: 'Status must be a string' })
	status: UserStatus;
}
