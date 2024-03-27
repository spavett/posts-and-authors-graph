import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import { Author } from './models/author.model';
import { AuthorsService } from './authors.service';
import { PostsService } from '../posts/posts.service';
import { Post } from 'src/posts/models/post.model';

@Resolver((of) => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService, // Ensure that the parameter name matches the imported class name
    private postsService: PostsService,
  ) {}

  @Query(returns => Author)
  async author(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOneById(id);
  }

  @ResolveField('posts', (returns) => [Post])
  async getPosts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAllByAuthor({ authorId: id });
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }) {
    return this.authorsService.findOneById(reference.id);
  }
}
