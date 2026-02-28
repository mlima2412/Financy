import { ObjectType, Field, Int } from "type-graphql";
import { TransactionModel } from "../../models/transaction.model";

@ObjectType()
export class PaginatedTransactionsOutput {
  @Field(() => [TransactionModel])
  transactions!: TransactionModel[];

  @Field(() => Int)
  total!: number;

  @Field(() => Int)
  page!: number;

  @Field(() => Int)
  totalPages!: number;
}
