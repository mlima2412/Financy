import { PrismaClient, TransactionType } from "@prisma/client";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "conta@teste.com" },
    update: {},
    create: {
      name: "Usuário Teste",
      email: "conta@teste.com",
      password: hashSync("12345678", 10),
    },
  });

  console.log("User created:", user.email);

  const categories = await Promise.all([
    prisma.category.create({
      data: {
        title: "Alimentação",
        description: "Gastos com comida e restaurantes",
        icon: "utensils",
        color: "#FF6B6B",
        userId: user.id,
      },
    }),
    prisma.category.create({
      data: {
        title: "Transporte",
        description: "Gastos com transporte e combustível",
        icon: "car",
        color: "#4ECDC4",
        userId: user.id,
      },
    }),
    prisma.category.create({
      data: {
        title: "Moradia",
        description: "Aluguel, contas de casa",
        icon: "home",
        color: "#45B7D1",
        userId: user.id,
      },
    }),
    prisma.category.create({
      data: {
        title: "Salário",
        description: "Receita mensal",
        icon: "wallet",
        color: "#96CEB4",
        userId: user.id,
      },
    }),
    prisma.category.create({
      data: {
        title: "Freelance",
        description: "Trabalhos extras",
        icon: "laptop",
        color: "#FFEAA7",
        userId: user.id,
      },
    }),
    prisma.category.create({
      data: {
        title: "Lazer",
        description: "Entretenimento e diversão",
        icon: "gamepad-2",
        color: "#DDA0DD",
        userId: user.id,
      },
    }),
  ]);

  console.log("Categories created:", categories.length);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const transactions = await Promise.all([
    prisma.transaction.create({
      data: {
        description: "Salário mensal",
        amount: 4250.0,
        type: TransactionType.INCOME,
        date: new Date(currentYear, currentMonth, 5),
        userId: user.id,
        categoryId: categories[3].id, // Salário
      },
    }),
    prisma.transaction.create({
      data: {
        description: "Projeto website",
        amount: 1500.0,
        type: TransactionType.INCOME,
        date: new Date(currentYear, currentMonth, 12),
        userId: user.id,
        categoryId: categories[4].id, // Freelance
      },
    }),
    prisma.transaction.create({
      data: {
        description: "Aluguel apartamento",
        amount: 1200.0,
        type: TransactionType.EXPENSE,
        date: new Date(currentYear, currentMonth, 1),
        userId: user.id,
        categoryId: categories[2].id, // Moradia
      },
    }),
    prisma.transaction.create({
      data: {
        description: "Supermercado semanal",
        amount: 350.0,
        type: TransactionType.EXPENSE,
        date: new Date(currentYear, currentMonth, 8),
        userId: user.id,
        categoryId: categories[0].id, // Alimentação
      },
    }),
    prisma.transaction.create({
      data: {
        description: "Gasolina",
        amount: 250.0,
        type: TransactionType.EXPENSE,
        date: new Date(currentYear, currentMonth, 10),
        userId: user.id,
        categoryId: categories[1].id, // Transporte
      },
    }),
    prisma.transaction.create({
      data: {
        description: "Restaurante japonês",
        amount: 180.45,
        type: TransactionType.EXPENSE,
        date: new Date(currentYear, currentMonth, 15),
        userId: user.id,
        categoryId: categories[0].id, // Alimentação
      },
    }),
    prisma.transaction.create({
      data: {
        description: "Cinema e pipoca",
        amount: 85.0,
        type: TransactionType.EXPENSE,
        date: new Date(currentYear, currentMonth, 18),
        userId: user.id,
        categoryId: categories[5].id, // Lazer
      },
    }),
    prisma.transaction.create({
      data: {
        description: "Uber semanal",
        amount: 115.0,
        type: TransactionType.EXPENSE,
        date: new Date(currentYear, currentMonth, 20),
        userId: user.id,
        categoryId: categories[1].id, // Transporte
      },
    }),
  ]);

  console.log("Transactions created:", transactions.length);
  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
