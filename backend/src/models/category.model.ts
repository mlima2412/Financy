import { ObjectType, Field, ID, Float, Int } from "type-graphql";

@ObjectType()
export class CategoryModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => String)
  icon!: string;

  @Field(() => String)
  color!: string;

  @Field(() => String)
  userId!: string;

  @Field(() => Int)
  transactionCount!: number;

  @Field(() => Float)
  totalValue!: number;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
