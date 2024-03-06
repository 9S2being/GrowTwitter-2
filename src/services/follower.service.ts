import { repository } from "../database/prisma.connection";
import { ResponseDTO } from "../dtos/response.dto";
import { Follow } from "../models/follow.model"

export class FollowerService {
    public async followUser(userId: string, followerId: string): Promise<ResponseDTO> {
        try {
            const existingFollower = await repository.follower.findUnique({
                where: {
                    userId_followerId: {
                        userId,
                        followerId
                    }
                }
            });
    
            if (existingFollower) {
                return {
                    success: false,
                    code: 400,
                    message: "Você já está seguindo este usuário",
                    data: null
                }
            }
    
            
        const newFollow = new Follow(userId, followerId)

        const result = await repository.follower.create({
                data: newFollow
            })
    
            return {
                success: true,
                code: 201,
                message: "Agora você está seguindo este usuário",
                data: result
            };
            
        } catch (error) {
            return {
                success: false,
                code: 500,
                message: "Erro ao seguir o usuário",
                data: null
            }
        }
    };

    public async unfollowUser(userId: string, followerId: string): Promise<ResponseDTO> {
        try {
            await repository.follower.deleteMany({
                where: {
                    userId,
                    followerId
                }
            });

            return {
                success: true,
                code: 200,
                message: "Você não está mais seguindo este usuário",
                data: null
            };
        } catch (error) {
            return {
                success: false,
                code: 500,
                message: "Erro ao deixar de seguir o usuário",
                data: null
            };
        }
    };
}    