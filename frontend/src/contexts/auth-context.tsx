import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { graphqlClient, getToken, setToken, removeToken } from "@/lib/graphql-client";
import { ME_QUERY } from "@/graphql/queries/user";
import { LOGIN_MUTATION } from "@/graphql/mutations/auth";
import { REGISTER_MUTATION } from "@/graphql/mutations/auth";
import type {
  User,
  AuthOutput,
  LoginInput,
  RegisterInput,
} from "@/types/graphql";

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextData | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = getToken();
    if (token) {
      graphqlClient
        .request<{ me: User }>(ME_QUERY)
        .then(({ me }) => setUser(me))
        .catch(() => {
          removeToken();
          setUser(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    async (data: LoginInput) => {
      const { login: result } = await graphqlClient.request<{
        login: AuthOutput;
      }>(LOGIN_MUTATION, { data });
      setToken(result.token);
      setUser(result.user);
      queryClient.clear();
    },
    [queryClient],
  );

  const register = useCallback(
    async (data: RegisterInput) => {
      const { register: result } = await graphqlClient.request<{
        register: AuthOutput;
      }>(REGISTER_MUTATION, { data });
      setToken(result.token);
      setUser(result.user);
      queryClient.clear();
    },
    [queryClient],
  );

  const logout = useCallback(() => {
    removeToken();
    setUser(null);
    queryClient.clear();
  }, [queryClient]);

  const updateUser = useCallback((updated: User) => {
    setUser(updated);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      updateUser,
    }),
    [user, isLoading, login, register, logout, updateUser],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
