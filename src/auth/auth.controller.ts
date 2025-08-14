import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Post('login')
	async login(@Body() loginDto: LoginDto) {
		const { user, error } = await this.authService.validateUser(
			loginDto.email,
			loginDto.password,
		);

		if (error || !user) {
			throw new UnauthorizedException(error || 'Invalid credentials');
		}

		return this.authService.login(user);
	}

	@Public()
	@Post('signup')
	async signup(@Body() signUpDto: SignUpDto) {
		const existingUser = await this.authService.findByEmail(signUpDto.email);
		if (existingUser) {
			throw new UnauthorizedException('Email already registered');
		}
		await this.authService.signUp(signUpDto);
		return {
			message: 'User registered successfully',
		};
	}
}
