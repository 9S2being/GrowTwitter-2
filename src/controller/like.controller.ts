import { Request, Response } from "express";
import { LikeService } from "../services/like.service";

const likeService = new LikeService();

export class LikeController {
    
    public async createLike(request: Request, response: Response) {
        try {
            // Registrando dados recebidos na requisição
            console.log("Dados recebidos na requisição:", request.body);
    
            const { userId, tweetId } = request.body;
    
            const result = await likeService.createLike(userId, tweetId);
    
            // Registrando a resposta retornada pelo serviço
            console.log("Resposta do serviço:", result);
    
            response.status(result.code).json(result);
        } catch (error) {
            // Melhorando a capacidade de depuração, registrando o erro no console
            
    
            response.status(500).json({
                success: false,
                code: 500,
                message: "Erro interno do servidor",
                data: null
            });
        }
    };
    

    public async getLikesByTweetId(request:Request, response:Response) {
        try {
        const { tweetId } = request.params;
        
        const result = await likeService.getLikesByTweetId(tweetId);

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

    public async deleteLike(request: Request, response: Response) {
        try {
            const { userId, tweetId } = request.body;
    
            const result = await likeService.deleteLike(userId, tweetId);
    
            response.status(result.code).json(result);
        } catch (error) {
            console.error("Erro ao processar a requisição:", error); // Melhorar a capacidade de depuração, registrando o erro no console
            response.status(500).json({
                success: false,
                code: 500,
                message: "Erro interno do servidor",
                data: null
            });
        }
    }
}
