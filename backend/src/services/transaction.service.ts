import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma/prisma";
import type { CreateTransactionInput, UpdateTransactionInput, TransactionFiltersInput } from "../dtos/input/transaction.input";
import { stripNulls } from "../utils/sanitize";

export class TransactionService {
  async findAll(userId: string, filters?: TransactionFiltersInput) {
    const page = Math.max(1, Math.floor(filters?.page ?? 1));
    const limit = Math.max(1, Math.floor(filters?.limit ?? 10));
    const skip = (page - 1) * limit;

    const where: Prisma.TransactionWhereInput = { userId };

    if (filters?.search) {
      where.description = { contains: filters.search };
    }

    if (filters?.type) {
      where.type = filters.type;
    }

    if (filters?.categoryId) {
      where.categoryId = filters.categoryId;
    }

    if (filters?.month !== undefined && filters?.year !== undefined) {
      const startDate = new Date(filters.year, filters.month - 1, 1);
      const endDate = new Date(filters.year, filters.month, 1);
      where.date = { gte: startDate, lt: endDate };
    }

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        include: {
          category: {
            include: {
              _count: { select: { transactions: true } },
              transactions: { select: { amount: true } },
            },
          },
        },
        orderBy: { date: "desc" },
        skip,
        take: limit,
      }),
      prisma.transaction.count({ where }),
    ]);

    const mapped = transactions.map((t) => ({
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
    }));

    return {
      transactions: mapped,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string, userId: string) {
    const transaction = await prisma.transaction.findFirst({
      where: { id, userId },
      include: {
        category: {
          include: {
            _count: { select: { transactions: true } },
            transactions: { select: { amount: true } },
          },
        },
      },
    });

    if (!transaction) {
      throw new Error("Transação não encontrada.");
    }

    return {
      ...transaction,
      category: transaction.category
        ? {
            ...transaction.category,
            transactionCount: transaction.category._count.transactions,
            totalValue: transaction.category.transactions.reduce(
              (sum, t) => sum + t.amount,
              0
            ),
          }
        : undefined,
    };
  }

  async create(data: CreateTransactionInput, userId: string) {
    const category = await prisma.category.findFirst({
      where: { id: data.categoryId, userId },
    });

    if (!category) {
      throw new Error("Categoria não encontrada ou não pertence ao usuário.");
    }

    const transaction = await prisma.transaction.create({
      data: { ...data, userId },
      include: {
        category: {
          include: {
            _count: { select: { transactions: true } },
            transactions: { select: { amount: true } },
          },
        },
      },
    });

    return {
      ...transaction,
      category: transaction.category
        ? {
            ...transaction.category,
            transactionCount: transaction.category._count.transactions,
            totalValue: transaction.category.transactions.reduce(
              (sum, t) => sum + t.amount,
              0
            ),
          }
        : undefined,
    };
  }

  async update(id: string, data: UpdateTransactionInput, userId: string) {
    const existing = await prisma.transaction.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      throw new Error("Transação não encontrada.");
    }

    if (data.categoryId) {
      const category = await prisma.category.findFirst({
        where: { id: data.categoryId, userId },
      });

      if (!category) {
        throw new Error("Categoria não encontrada ou não pertence ao usuário.");
      }
    }

    const transaction = await prisma.transaction.update({
      where: { id },
      data: stripNulls(data),
      include: {
        category: {
          include: {
            _count: { select: { transactions: true } },
            transactions: { select: { amount: true } },
          },
        },
      },
    });

    return {
      ...transaction,
      category: transaction.category
        ? {
            ...transaction.category,
            transactionCount: transaction.category._count.transactions,
            totalValue: transaction.category.transactions.reduce(
              (sum, t) => sum + t.amount,
              0
            ),
          }
        : undefined,
    };
  }

  async delete(id: string, userId: string) {
    const existing = await prisma.transaction.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      throw new Error("Transação não encontrada.");
    }

    await prisma.transaction.delete({ where: { id } });
    return true;
  }
}
