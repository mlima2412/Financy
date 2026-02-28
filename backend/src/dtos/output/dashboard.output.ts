import { ObjectType, Field, Float } from "type-graphql";
import { TransactionModel } from "../../models/transaction.model";
import { CategoryModel } from "../../models/category.model";

@ObjectType()
export class DashboardOutput {
  @Field(() => Float)
  totalBalance!: number;

  @Field(() => Float)
  monthlyIncome!: number;

  @Field(() => Float)
  monthlyExpenses!: number;

  @Field(() => [TransactionModel])
  recentTransactions!: TransactionModel[];

  @Field(() => [CategoryModel])
  categories!: CategoryModel[];
}
