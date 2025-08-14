import { UserRole, UserStatus } from 'src/users/users.enum';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpDto {
	@IsString()
	name: string;

	@IsEmail()
	email: string;

	@IsString()
	@MinLength(6)
	password: string;

	role?: UserRole; // Optional, default to USER

	status?: UserStatus; // Optional, default to ACTIVE
}
