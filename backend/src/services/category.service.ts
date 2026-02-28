import { prisma } from "../../prisma/prisma";
import type { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input";
import { stripNulls } from "../utils/sanitize";

export class CategoryService {
  async findAll(userId: string) {
    const categories = await prisma.category.findMany({
      where: { userId },
      include: {
        _count: { select: { transactions: true } },
        transactions: { select: { amount: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const mapped = categories.map((cat) => ({
      ...cat,
      transactionCount: cat._count.transactions,
      totalValue: cat.transactions.reduce((sum, t) => sum + t.amount, 0),
    }));

    const totalCategories = mapped.length;
    const totalTransactions = mapped.reduce(
      (sum, c) => sum + c.transactionCount,
      0
    );

    const mostUsed = mapped.reduce<(typeof mapped)[number] | null>(
      (best, c) =>
        !best || c.transactionCount > best.transactionCount ? c : best,
      null
    );

    return {
      totalCategories,
      totalTransactions,
      mostUsedCategory: mostUsed?.title ?? null,
      categories: mapped,
    };
  }

  async findById(id: string, userId: string) {
    const category = await prisma.category.findFirst({
      where: { id, userId },
      include: {
        _count: { select: { transactions: true } },
        transactions: { select: { amount: true } },
      },
    });

    if (!category) {
      throw new Error("Categoria não encontrada.");
    }

    return {
      ...category,
      transactionCount: category._count.transactions,
      totalValue: category.transactions.reduce((sum, t) => sum + t.amount, 0),
    };
  }

  async create(data: CreateCategoryInput, userId: string) {
    const category = await prisma.category.create({
      data: { ...data, userId },
    });

    return { ...category, transactionCount: 0, totalValue: 0 };
  }

  async update(id: string, data: UpdateCategoryInput, userId: string) {
    const existing = await prisma.category.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      throw new Error("Categoria não encontrada.");
    }

    const updated = await prisma.category.update({
      where: { id },
      data: stripNulls(data),
      include: {
        _count: { select: { transactions: true } },
        transactions: { select: { amount: true } },
      },
    });

    return {
      ...updated,
      transactionCount: updated._count.transactions,
      totalValue: updated.transactions.reduce((sum, t) => sum + t.amount, 0),
    };
  }

  async delete(id: string, userId: string) {
    const existing = await prisma.category.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      throw new Error("Categoria não encontrada.");
    }

    await prisma.category.delete({ where: { id } });
    return true;
  }
}
