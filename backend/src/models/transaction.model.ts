import { ObjectType, Field, ID, Float, registerEnumType } from "type-graphql";
import { TransactionType } from "@prisma/client";
import { CategoryModel } from "./category.model";

registerEnumType(TransactionType, {
  name: "TransactionType",
  description: "Tipo da transação: receita ou despesa",
});

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  description!: string;

  @Field(() => Float)
  amount!: number;

  @Field(() => TransactionType)
  type!: TransactionType;

  @Field(() => Date)
  date!: Date;

  @Field(() => String)
  userId!: string;

  @Field(() => String)
  categoryId!: string;

  @Field(() => CategoryModel, { nullable: true })
  category?: CategoryModel;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
