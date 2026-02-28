import { prisma } from "../../prisma/prisma";
import type { UpdateUserInput } from "../dtos/input/user.input";

export class UserService {
  async me(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    return user;
  }

  async update(userId: string, data: UpdateUserInput) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { name: data.name },
    });

    return user;
  }
}
