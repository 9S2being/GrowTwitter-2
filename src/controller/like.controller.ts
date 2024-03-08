import { Request, Response } from "express";
import { LikeService } from "../services/like.service";

const likeService = new LikeService();

export class LikeController {
    
    public async createLike(request: Request, response: Response) {
        try {
            
            const { userId, tweetId } = request.body;
    
            const result = await likeService.createLike(userId, tweetId)
          
            response.status(result.code).json(result)

        } catch (error) {
            response.status(500).json({
                success: false,
                code: 400,
                message: "Erro interno do servidor",
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
                code: 400,
                message: "Erro interno do servidor",
               
            })
        }
    };

    public async deleteLike(request: Request, response: Response) {
        try {
            const { userId, tweetId } = request.body;
    
            const result = await likeService.deleteLike(userId, tweetId)
    
            response.status(result.code).json(result)

        } catch (error) {
            response.status(500).json({
                success: false,
                code: 400,
                message: "Erro interno do servidor",
               
            });
        }
    };
}
