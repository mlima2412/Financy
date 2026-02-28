import { createParameterDecorator } from "type-graphql";
import type { GraphqlContext } from "../context";

export function GqlUser() {
  return createParameterDecorator<GraphqlContext>(({ context }) => {
    if (!context.user) {
      throw new Error("Não autenticado.");
    }
    return context.user;
  });
}
