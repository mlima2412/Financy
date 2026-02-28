import { InputType, Field, Float, Int } from "type-graphql";
import { TransactionType } from "@prisma/client";

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  description!: string;

  @Field(() => Float)
  amount!: number;

  @Field(() => TransactionType)
  type!: TransactionType;

  @Field(() => Date)
  date!: Date;

  @Field(() => String)
  categoryId!: string;
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Float, { nullable: true })
  amount?: number;

  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType;

  @Field(() => Date, { nullable: true })
  date?: Date;

  @Field(() => String, { nullable: true })
  categoryId?: string;
}

@InputType()
export class TransactionFiltersInput {
  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType;

  @Field(() => String, { nullable: true })
  categoryId?: string;

  @Field(() => Int, { nullable: true })
  month?: number;

  @Field(() => Int, { nullable: true })
  year?: number;

  @Field(() => Int, { nullable: true, defaultValue: 1 })
  page?: number;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  limit?: number;
}
