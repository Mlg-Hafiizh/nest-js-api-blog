import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { SignUpDto } from './dto/signup.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { UserRole, UserStatus } from 'src/users/users.enum';

@Injectable()
export class AuthService {
	private readonly jwtService: JwtService;
	private readonly configService: ConfigService;
	private readonly usersService: UsersService;

	constructor(
		jwtService: JwtService,
		configService: ConfigService,
		usersService: UsersService,
	) {
		this.jwtService = jwtService;
		this.configService = configService;
		this.usersService = usersService;
	}

	async validateUser(
		email: string,
		pass: string,
	): Promise<{ user?: User; error?: string }> {
		const user = await this.usersService.findByEmail(email);
		if (!user) {
			return { error: 'User not found' };
		}

		const isMatch = await bcrypt.compare(pass, user.password); // compare hash
		if (!isMatch) {
			return { error: 'Incorrect password' };
		}

		return { user };
	}

	async login(user: User): Promise<{ accessToken: string }> {
		const payload = { email: user.email, sub: user.id };
		const accessToken = this.jwtService.sign(payload);
		return { accessToken };
	}

	async signUp(signUpDto: SignUpDto): Promise<User & { token: string }> {
		const existingUser = await this.usersService.findByEmail(signUpDto.email);
		if (existingUser) {
			throw new UnauthorizedException('Email already exists');
		}
		const role = UserRole.USER;
		const status = UserStatus.ACTIVE;
		const createUserDto = {
			...signUpDto,
			role,
			status,
		};

		const createdUser = await this.usersService.create(createUserDto);
		const token = this.jwtService.sign(
			{ id: createdUser.data.id },
			{
				secret: this.configService.get('JWT_SECRET'),
				expiresIn: this.configService.get('JWT_EXPIRATION') || '3d',
			},
		);
		return { ...createdUser.data, token };
	}

	async getJwtSecret(): Promise<string> {
		const secret = this.configService.get<string>('JWT_SECRET');
		if (!secret) {
			throw new Error('JWT_SECRET is not defined in configuration');
		}
		return secret;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await this.usersService.findByEmail(email);
		return user ?? null;
	}
}
