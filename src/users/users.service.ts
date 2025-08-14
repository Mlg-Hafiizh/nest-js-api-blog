import {
	Injectable,
	NotFoundException,
	ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
	) {}

	async create(
		createUserDto: CreateUserDto,
	): Promise<{ message: string; data: User }> {
		const existingUser = await this.usersRepository.findOne({
			where: { email: createUserDto.email },
		});

		if (existingUser) {
			throw new ConflictException('Email already exists');
		}

		const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

		const user = this.usersRepository.create({
			...createUserDto,
			password: hashedPassword,
		});

		const savedUser = await this.usersRepository.save(user);

		return {
			message: 'User created successfully',
			data: savedUser,
		};
	}

	async findAll(): Promise<User[]> {
		return await this.usersRepository.find();
	}

	async findOne(id: number): Promise<User> {
		const user = await this.usersRepository.findOneBy({ id });
		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`);
		}
		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		return await this.usersRepository.findOne({
			where: { email },
			select: ['id', 'email', 'password', 'role', 'status'], // penting
		});
	}

	async update(
		id: number,
		updateUserDto: UpdateUserDto,
	): Promise<{ message: string; data: User }> {
		const user = await this.findOne(id);

		if (updateUserDto.password) {
			updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
		}

		Object.assign(user, updateUserDto);
		const updatedUser = await this.usersRepository.save(user);

		return {
			message: 'User updated successfully',
			data: updatedUser,
		};
	}

	async remove(id: number): Promise<{ message: string }> {
		const user = await this.findOne(id);
		await this.usersRepository.remove(user);
		return { message: 'User deleted successfully' };
	}
}
