import { Request, Response } from "express";

import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController {
  public async login(request: Request, response: Response) {
    try {
      const {username, email, password } = request.body

      if (!username || !email || !password) {
        return response.status(400).json({
          success: false,
          code: response.statusCode,
          message: "Preencha os campos obrigatórios."
        })
      }

      const { token, userId } = await authService.login(username, email, password)

      return response.status(200).json({
        success: true,
        code: response.statusCode,
        message: "Login realizado com sucesso.",
        token,
        userId
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao fazer login."
      })
    }
  }
}