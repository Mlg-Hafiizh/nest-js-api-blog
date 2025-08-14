import {
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	JoinColumn,
} from 'typeorm';
// Update the import path if the file is located elsewhere, for example:
import { User } from '../../users/entities/user.entity';
// Or, if the file is actually named 'users.entity.ts', ensure it exists at the specified path.

@Entity('post')
export class Post {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 150 })
	title: string;

	@Column({ type: 'text' })
	content: string;

	@ManyToOne(() => User, (user: User) => user.posts, { eager: true })
	@JoinColumn({ name: 'author_id' }) // nama kolom di tabel
	author: User;

	@Column({ default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@Column({ default: () => 'CURRENT_TIMESTAMP' })
	updatedAt: Date;
}
