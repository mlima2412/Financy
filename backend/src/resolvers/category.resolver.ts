import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import { CategoryModel } from "../models/category.model";
import { CategorySummaryOutput } from "../dtos/output/category.output";
import { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input";
import { CategoryService } from "../services/category.service";
import { IsAuth } from "../middlewares/auth.middleware";
import { GqlUser } from "../graphql/decorators/user.decorator";
import type { JwtPayload } from "../utils/jwt";

@Resolver()
export class CategoryResolver {
  private categoryService = new CategoryService();

  @Query(() => CategorySummaryOutput)
  @UseMiddleware(IsAuth)
  async categories(
    @GqlUser() user: JwtPayload
  ): Promise<CategorySummaryOutput> {
    return this.categoryService.findAll(user.id);
  }

  @Query(() => CategoryModel)
  @UseMiddleware(IsAuth)
  async category(
    @Arg("id", () => String) id: string,
    @GqlUser() user: JwtPayload
  ): Promise<CategoryModel> {
    return this.categoryService.findById(id, user.id);
  }

  @Mutation(() => CategoryModel)
  @UseMiddleware(IsAuth)
  async createCategory(
    @Arg("data", () => CreateCategoryInput) data: CreateCategoryInput,
    @GqlUser() user: JwtPayload
  ): Promise<CategoryModel> {
    return this.categoryService.create(data, user.id);
  }

  @Mutation(() => CategoryModel)
  @UseMiddleware(IsAuth)
  async updateCategory(
    @Arg("id", () => String) id: string,
    @Arg("data", () => UpdateCategoryInput) data: UpdateCategoryInput,
    @GqlUser() user: JwtPayload
  ): Promise<CategoryModel> {
    return this.categoryService.update(id, data, user.id);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(IsAuth)
  async deleteCategory(
    @Arg("id", () => String) id: string,
    @GqlUser() user: JwtPayload
  ): Promise<boolean> {
    return this.categoryService.delete(id, user.id);
  }
}
