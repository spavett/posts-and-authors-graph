import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Image } from './image.model';
import { Tag } from './tag.model';

@ObjectType()
@Directive('@key(fields: "id")')
export class Post {
  @Field(type => ID)
  id: number;

  @Field(type => Int)
  authorId: number;

  @Field()
  title: string;

  @Field(type => Int, { nullable: true })
  votes?: number;

  @Field(type => [ID], { nullable: true })
  imageIds?: string[];

  @Field(type => [Int], { nullable: true })
  tagIds?: number[];
}
