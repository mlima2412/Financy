import { GraphQLClient } from "graphql-request";

const STORAGE_KEY = "financy:token";

let cachedToken: string | null = null;

export function getToken(): string | null {
  if (cachedToken === null) {
    cachedToken = localStorage.getItem(STORAGE_KEY);
  }
  return cachedToken;
}

export function setToken(token: string): void {
  cachedToken = token;
  localStorage.setItem(STORAGE_KEY, token);
}

export function removeToken(): void {
  cachedToken = null;
  localStorage.removeItem(STORAGE_KEY);
}

function getHeaders(): Record<string, string> {
  const token = getToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

export const graphqlClient = new GraphQLClient(
  import.meta.env.VITE_BACKEND_URL || "http://localhost:4000/graphql",
  {
    headers: () => getHeaders(),
  },
);
