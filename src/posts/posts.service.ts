import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {
	constructor(
		@InjectRepository(Post)
		private postsRepository: Repository<Post>,
		@InjectRepository(User)
		private usersRepository: Repository<User>,
	) {}

	async create(createPostDto: CreatePostDto): Promise<{
		message: string;
		data: Post;
	}> {
		const { author, ...rest } = createPostDto as CreatePostDto;
		const post = this.postsRepository.create({
			...rest,
			author: author
				? this.usersRepository.create({ id: Number(author) })
				: undefined,
		});
		const savedPost = await this.postsRepository.save(post);
		return {
			message: 'Post created successfully',
			data: savedPost,
		};
	}

	async findAll() {
		return await this.postsRepository.find();
	}

	async findOne(id: number) {
		return await this.postsRepository.findOneBy({ id });
	}

	async update(updatePostDto: UpdatePostDto): Promise<{
		message: string;
		data: Post;
	}> {
		const { author, ...rest } = updatePostDto;
		const updateData: Partial<Post> = {
			...rest,
			author: author ? ({ id: Number(author) } as User) : undefined,
		};

		const updatedPost = await this.postsRepository.save(updateData);

		return {
			message: 'Post updated successfully',
			data: updatedPost,
		};
	}

	async remove(id: number): Promise<{ message: string }> {
		await this.postsRepository.delete(id);
		return { message: 'Post removed successfully' };
	}
}
