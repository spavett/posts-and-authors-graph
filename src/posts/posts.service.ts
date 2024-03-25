import { Injectable } from '@nestjs/common';
import { Post } from './models/post.model';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    {
      id: 1,
      authorId: 1,
      title: 'NestJS is awesome!',
      votes: 0,
      imageIds: ['1', '2'],
    },
    {
      id: 2,
      authorId: 2,
      title: 'GraphQL is awesome!',
      votes: 0,
      imageIds: ['1', '2'],
    },
  ];

  findOneById(id: number) {
    return this.posts.find((post) => post.id === id);
  }

  findAllByAuthor(filter: { authorId: number }) {
    return this.posts.filter((post) => post.authorId === filter.authorId);
  }

  findAll() {
    return this.posts;
  }
}
