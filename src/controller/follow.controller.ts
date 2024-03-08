import { Request, Response } from "express";
import { FollowerService } from "../services/follower.service";

const followerService = new FollowerService()

export class FollowerController {
   
    public async followUser(request: Request, response: Response) {
        try {
            const { userId, followerId } = request.body;
    
            // Verifica se os campos necessários estão presentes no corpo da requisição
            if (!userId || !followerId) {
                return response.status(400).json({
                    success: false,
                    code: 400,
                    message: "Campos 'userId' e 'followerId' são obrigatórios",
                   
                });
            }
    
            // Chama o serviço para seguir o usuário
            const result = await followerService.followUser(userId, followerId);
    
            // Retorna o resultado da operação
            return response.status(result.code).json(result);
        } catch (error) {
            // Trata qualquer erro interno do servidor
            console.error("Erro interno do servidor:", error);
            return response.status(500).json({
                success: false,
                code: 400,
                message: "Erro interno do servidor",
            });
        }
    }

    public async unfollowUser(request:Request, response:Response) {
        try {
        const { userId, followerId } = request.body;
       
        const result = await followerService.unfollowUser(userId, followerId);
            
        response.status(result.code).json(result);

        } catch (error) {
            response.status(500).json({
                success: false,
                code: 500,
                message: "Erro interno do servidor",
                data: null
            })
        }
    };

}
