import { TransactionType } from "@prisma/client";
import { prisma } from "../../prisma/prisma";

export class DashboardService {
  async getDashboard(userId: string, month?: number, year?: number) {
    const now = new Date();
    const targetMonth = month ?? now.getMonth() + 1;
    const targetYear = year ?? now.getFullYear();

    const startDate = new Date(targetYear, targetMonth - 1, 1);
    const endDate = new Date(targetYear, targetMonth, 1);

    const [allTransactions, monthlyTransactions, recentTransactions, categories] =
      await Promise.all([
        prisma.transaction.findMany({
          where: { userId },
          select: { amount: true, type: true },
        }),
        prisma.transaction.findMany({
          where: {
            userId,
            date: { gte: startDate, lt: endDate },
          },
          select: { amount: true, type: true },
        }),
        prisma.transaction.findMany({
          where: { userId },
          include: {
            category: {
              include: {
                _count: { select: { transactions: true } },
                transactions: { select: { amount: true } },
              },
            },
          },
          orderBy: { date: "desc" },
          take: 5,
        }),
        prisma.category.findMany({
          where: { userId },
          include: {
            _count: { select: { transactions: true } },
            transactions: { select: { amount: true } },
          },
          orderBy: { createdAt: "desc" },
        }),
      ]);

    const totalIncome = allTransactions
      .filter((t) => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = allTransactions
      .filter((t) => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyIncome = monthlyTransactions
      .filter((t) => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyExpenses = monthlyTransactions
      .filter((t) => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalBalance: totalIncome - totalExpenses,
      monthlyIncome,
      monthlyExpenses,
      recentTransactions: recentTransactions.map((t) => ({
        ...t,
        category: t.category
          ? {
              ...t.category,
              transactionCount: t.category._count.transactions,
              totalValue: t.category.transactions.reduce(
                (sum, tr) => sum + tr.amount,
                0
              ),
            }
          : undefined,
      })),
      categories: categories.map((c) => ({
        ...c,
        transactionCount: c._count.transactions,
        totalValue: c.transactions.reduce((sum, t) => sum + t.amount, 0),
      })),
    };
  }
}
