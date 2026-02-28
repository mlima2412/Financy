import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { ProtectedRoute } from "./protected-route";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";
import { DashboardPage } from "@/pages/dashboard";
import { TransactionsPage } from "@/pages/transactions";
import { CategoriesPage } from "@/pages/categories";
import { ProfilePage } from "@/pages/profile";
import { AppLayout } from "@/components/layout/app-layout";

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/cadastro"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/transacoes" element={<TransactionsPage />} />
        <Route path="/categorias" element={<CategoriesPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
