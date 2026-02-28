import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import { TransactionModel } from "../models/transaction.model";
import { PaginatedTransactionsOutput } from "../dtos/output/transaction.output";
import {
  CreateTransactionInput,
  UpdateTransactionInput,
  TransactionFiltersInput,
} from "../dtos/input/transaction.input";
import { TransactionService } from "../services/transaction.service";
import { IsAuth } from "../middlewares/auth.middleware";
import { GqlUser } from "../graphql/decorators/user.decorator";
import type { JwtPayload } from "../utils/jwt";

@Resolver()
export class TransactionResolver {
  private transactionService = new TransactionService();

  @Query(() => PaginatedTransactionsOutput)
  @UseMiddleware(IsAuth)
  async transactions(
    @GqlUser() user: JwtPayload,
    @Arg("filters", () => TransactionFiltersInput, { nullable: true })
    filters?: TransactionFiltersInput
  ): Promise<PaginatedTransactionsOutput> {
    return this.transactionService.findAll(user.id, filters);
  }

  @Query(() => TransactionModel)
  @UseMiddleware(IsAuth)
  async transaction(
    @Arg("id", () => String) id: string,
    @GqlUser() user: JwtPayload
  ): Promise<TransactionModel> {
    return this.transactionService.findById(id, user.id);
  }

  @Mutation(() => TransactionModel)
  @UseMiddleware(IsAuth)
  async createTransaction(
    @Arg("data", () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: JwtPayload
  ): Promise<TransactionModel> {
    return this.transactionService.create(data, user.id);
  }

  @Mutation(() => TransactionModel)
  @UseMiddleware(IsAuth)
  async updateTransaction(
    @Arg("id", () => String) id: string,
    @Arg("data", () => UpdateTransactionInput) data: UpdateTransactionInput,
    @GqlUser() user: JwtPayload
  ): Promise<TransactionModel> {
    return this.transactionService.update(id, data, user.id);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(IsAuth)
  async deleteTransaction(
    @Arg("id", () => String) id: string,
    @GqlUser() user: JwtPayload
  ): Promise<boolean> {
    return this.transactionService.delete(id, user.id);
  }
}
