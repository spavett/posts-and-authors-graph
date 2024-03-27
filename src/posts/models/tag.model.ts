import { ObjectType, Directive, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Directive(`@key(fields: "id")`)
export class Tag {
  @Field((type) => Int)
  id: number;
}
