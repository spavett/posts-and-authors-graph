import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Post } from './models/post.model';
import { PostsService } from './posts.service';
import { Image } from './models/image.model';
import { Author } from 'src/authors/models/author.model';
import { AuthorsService } from 'src/authors/authors.service';

@Resolver(of => Post)
export class PostsResolver {
  constructor(
    private postsService: PostsService,
    private authorsService: AuthorsService,
  ) {}

  @ResolveField('images', (returns) => [Image])
  async getImages(@Parent() post: Post): Promise<any[]> {
    const { imageIds } = post;
    return imageIds.map((imageId) => ({ __typename: 'Image', id: imageId }));
  }

  @ResolveField('author', (returns) => Author)
  async getAuthor(@Parent() post: Post) {
    const { authorId } = post;
    return this.authorsService.findOneById(authorId);
  }

  @Query(returns => Post)
  async post(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.postsService.findOneById(id);
  }

  @Query(returns => [Post])
  async postsByAuthor(
    @Args({ name: 'authorId', type: () => Int }) authorId: number,
  ) {
    return this.postsService.findAllByAuthor({ authorId });
  }

  @Query(returns => [Post])
  async allPosts() {
    return this.postsService.findAll();
  }
}
