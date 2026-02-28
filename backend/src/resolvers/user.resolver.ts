import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import { UserModel } from "../models/user.model";
import { UpdateUserInput } from "../dtos/input/user.input";
import { UserService } from "../services/user.service";
import { IsAuth } from "../middlewares/auth.middleware";
import { GqlUser } from "../graphql/decorators/user.decorator";
import type { JwtPayload } from "../utils/jwt";

@Resolver()
export class UserResolver {
  private userService = new UserService();

  @Query(() => UserModel)
  @UseMiddleware(IsAuth)
  async me(@GqlUser() user: JwtPayload): Promise<UserModel> {
    return this.userService.me(user.id);
  }

  @Mutation(() => UserModel)
  @UseMiddleware(IsAuth)
  async updateUser(
    @Arg("data", () => UpdateUserInput) data: UpdateUserInput,
    @GqlUser() user: JwtPayload
  ): Promise<UserModel> {
    return this.userService.update(user.id, data);
  }
}
