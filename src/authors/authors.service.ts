import { Injectable } from '@nestjs/common';
import { Author } from './models/author.model';

@Injectable()
export class AuthorsService {
  private authors: Author[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      //posts: [],
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      //posts: [],
    },
  ];

  findOneById(id: number) {
    return this.authors.find((author) => author.id === id);
  }
}
