import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
	@IsNotEmpty({ message: 'Title is required' })
	@IsString({ message: 'Title must be a string' })
	@MaxLength(100)
	title: string;

	@IsNotEmpty({ message: 'Content is required' })
	@IsString()
	content: string;

	@IsNotEmpty({ message: 'Author is required' })
	@IsString()
	author: string;
}
