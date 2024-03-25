import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { AuthorsService } from 'src/authors/authors.service';

@Module({
  providers: [PostsResolver, PostsService, AuthorsService],
  exports: [PostsService],
})
export class PostsModule {}
