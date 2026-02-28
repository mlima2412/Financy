import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  email!: string;

  // password is intentionally NOT exposed as a @Field

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
