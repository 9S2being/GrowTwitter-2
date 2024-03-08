import { NextFunction, Request, Response } from "express";
import { repository } from "../database/prisma.connection";

export async function validateToken(request: Request, response: Response, next: NextFunction) {
  try {
    
    const { authorization } = request.headers;
    const { idUser } = request.params

    if (!authorization) {
      return response.status(401).json({
        success: false,
        code: response.statusCode,
        message: "Token de autenticação não informado."
      })
    }

    const user = await repository.user.findUnique({
      where: {
        id: idUser
      }
    })

    if (!user || user.token !== authorization) {
      return response.status(401).json({
        success: false,
        code: response.statusCode,
        message: "Token de autenticação inválido."
      })
    }

    next();
  } catch (error) {
    return response.status(500).json({
      success: false,
      code: response.statusCode,
      message: "Erro"
    })
  }
}