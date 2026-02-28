import "reflect-metadata";
import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { buildSchema } from "type-graphql";
import { buildContext, type GraphqlContext } from "./graphql/context";
import { AuthResolver } from "./resolvers/auth.resolver";
import { CategoryResolver } from "./resolvers/category.resolver";
import { TransactionResolver } from "./resolvers/transaction.resolver";
import { DashboardResolver } from "./resolvers/dashboard.resolver";
import { UserResolver } from "./resolvers/user.resolver";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      CategoryResolver,
      TransactionResolver,
      DashboardResolver,
      UserResolver,
    ],
    emitSchemaFile: "./schema.graphql",
    validate: false,
  });

  const server = new ApolloServer<GraphqlContext>({ schema });
  await server.start();

  const app = express();

  app.use(
    "/graphql",
    cors({ origin: "http://localhost:5173", credentials: true }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => buildContext({ req }),
    })
  );

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
  });
}

bootstrap().catch(console.error);
