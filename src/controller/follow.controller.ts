import { Request, Response } from "express";
import { FollowerService } from "../services/follower.service";

const followerService = new FollowerService()

export class FollowerController {
   
    public async followUser(request:Request, response:Response) {
    try {
        const { userId, followerId } = request.body;

        const result = await followerService.followUser(userId, followerId);

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
