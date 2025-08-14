import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { UserRole, UserStatus } from '../users.enum';

@Entity('users') // Nama tabel eksplisit
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 100 })
	name: string;

	@Column({
		unique: true,
		length: 150,
	})
	email: string;

	@Column({
		select: false, // Exclude dari query default untuk keamanan
		length: 255,
	})
	password: string;

	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.USER,
	})
	role: UserRole;

	@Column({
		type: 'enum',
		enum: UserStatus,
		default: UserStatus.ACTIVE,
	})
	status: UserStatus;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
	posts: any;
}
