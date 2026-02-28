import { Resolver, Mutation, Arg } from "type-graphql";
import { AuthOutput } from "../dtos/output/auth.output";
import { RegisterInput, LoginInput } from "../dtos/input/auth.input";
import { AuthService } from "../services/auth.service";

@Resolver()
export class AuthResolver {
  private authService = new AuthService();

  @Mutation(() => AuthOutput)
  async register(
    @Arg("data", () => RegisterInput) data: RegisterInput
  ): Promise<AuthOutput> {
    return this.authService.register(data);
  }

  @Mutation(() => AuthOutput)
  async login(
    @Arg("data", () => LoginInput) data: LoginInput
  ): Promise<AuthOutput> {
    return this.authService.login(data);
  }
}
