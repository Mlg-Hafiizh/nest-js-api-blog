import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { LogsModule } from 'src/logs/logs.module';

@Module({
	imports: [LogsModule, TypeOrmModule.forFeature([Post, User])],
	controllers: [PostsController],
	providers: [PostsService],
})
export class PostsModule {}
