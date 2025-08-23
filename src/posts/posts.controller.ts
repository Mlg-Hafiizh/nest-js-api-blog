import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { LogsService } from 'src/logs/logs.service';

@Controller('posts')
export class PostsController {
	constructor(
		private readonly postsService: PostsService,
		private readonly logsService: LogsService,
	) {}

	@Post()
	async create(@Body() createPostDto: CreatePostDto) {
		const post = await this.postsService.create(createPostDto);
		await this.logsService.createLog(
			'CREATE_POST',
			Number(post.data.id),
			'Post created',
		);
		return post;
	}

	@Get()
	findAll() {
		return this.postsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.postsService.findOne(+id);
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
		const post = await this.postsService.update(updatePostDto);
		await this.logsService.createLog(
			'UPDATE_POST',
			Number(post.data.id),
			JSON.stringify({ id, dto: updatePostDto }),
		);
		return post;
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		const result = await this.postsService.remove(+id);
		await this.logsService.createLog(
			'DELETE_POST',
			Number(id),
			JSON.stringify({ id }),
		);
		return result;
	}
}
