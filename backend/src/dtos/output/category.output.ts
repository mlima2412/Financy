import { ObjectType, Field, Int } from "type-graphql";
import { CategoryModel } from "../../models/category.model";

@ObjectType()
export class CategorySummaryOutput {
  @Field(() => Int)
  totalCategories!: number;

  @Field(() => Int)
  totalTransactions!: number;

  @Field(() => String, { nullable: true })
  mostUsedCategory?: string | null;

  @Field(() => [CategoryModel])
  categories!: CategoryModel[];
}
