import { Resolver, Query, Arg, Int, UseMiddleware } from "type-graphql";
import { DashboardOutput } from "../dtos/output/dashboard.output";
import { DashboardService } from "../services/dashboard.service";
import { IsAuth } from "../middlewares/auth.middleware";
import { GqlUser } from "../graphql/decorators/user.decorator";
import type { JwtPayload } from "../utils/jwt";

@Resolver()
export class DashboardResolver {
  private dashboardService = new DashboardService();

  @Query(() => DashboardOutput)
  @UseMiddleware(IsAuth)
  async dashboard(
    @GqlUser() user: JwtPayload,
    @Arg("month", () => Int, { nullable: true }) month?: number,
    @Arg("year", () => Int, { nullable: true }) year?: number
  ): Promise<DashboardOutput> {
    return this.dashboardService.getDashboard(user.id, month, year);
  }
}
