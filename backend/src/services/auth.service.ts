import { prisma } from "../../prisma/prisma";
import { hashPassword, comparePassword } from "../utils/hash";
import { signJwt } from "../utils/jwt";
import type { RegisterInput, LoginInput } from "../dtos/input/auth.input";

export class AuthService {
  async register(data: RegisterInput) {
    if (data.password.length < 8) {
      throw new Error("A senha deve ter no mínimo 8 caracteres.");
    }

    const exists = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (exists) {
      throw new Error("Este e-mail já está cadastrado.");
    }

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashPassword(data.password),
      },
    });

    const token = signJwt({ id: user.id, email: user.email });

    return { token, refreshToken: token, user };
  }

  async login(data: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error("E-mail ou senha inválidos.");
    }

    const valid = comparePassword(data.password, user.password);

    if (!valid) {
      throw new Error("E-mail ou senha inválidos.");
    }

    const token = signJwt({ id: user.id, email: user.email });

    return { token, refreshToken: token, user };
  }
}
