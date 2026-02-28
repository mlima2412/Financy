export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  title: string;
  description: string | null;
  icon: string;
  color: string;
  transactionCount: number;
  totalValue: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  categoryId: string;
  category: Category | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthOutput {
  token: string;
  refreshToken: string;
  user: User;
}

export interface DashboardOutput {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  recentTransactions: Transaction[];
  categories: Category[];
}

export interface PaginatedTransactions {
  transactions: Transaction[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CategorySummary {
  categories: Category[];
  totalCategories: number;
  totalTransactions: number;
  mostUsedCategory: string | null;
}

export interface TransactionFilters {
  search?: string;
  type?: TransactionType;
  categoryId?: string;
  month?: number;
  year?: number;
  page?: number;
  limit?: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface CreateTransactionInput {
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  categoryId: string;
}

export interface UpdateTransactionInput {
  description?: string;
  amount?: number;
  type?: TransactionType;
  date?: string;
  categoryId?: string;
}

export interface CreateCategoryInput {
  title: string;
  description?: string;
  icon: string;
  color: string;
}

export interface UpdateCategoryInput {
  title?: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface UpdateUserInput {
  name: string;
}
