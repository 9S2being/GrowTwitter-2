import { randomUUID } from "crypto";

import { repository } from "../database/prisma.connection";

export class AuthService {
  public async login(username: string, email: string, password: string): Promise<{ token: string, userId: string }> {
    const user = await repository.user.findFirst({
      where: {
        username,
        email,
        password
      }
    })

    if (!user) {
      throw new Error("Credenciais inválidas")
    }

    const token = randomUUID()
    const userId = user.id

    await repository.user.update({
      where: {
        id: user.id
      },
      data: {
        token
      }
    })

    return { token, userId }
  }
}