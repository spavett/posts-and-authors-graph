import { ObjectType, Directive, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Directive(`@key(fields: "id")`)
export class Image {
  @Field(type => ID)
  id: string;
}
