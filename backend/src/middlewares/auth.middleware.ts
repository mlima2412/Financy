import { type MiddlewareFn } from "type-graphql";
import type { GraphqlContext } from "../graphql/context";

export const IsAuth: MiddlewareFn<GraphqlContext> = ({ context }, next) => {
  if (!context.user) {
    throw new Error("Não autenticado. Faça login para continuar.");
  }
  return next();
};
