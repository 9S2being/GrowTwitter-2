import { repository } from "../database/prisma.connection";
import { ResponseDTO } from "../dtos/response.dto";
import { Follow } from "../models/follow.model"

export class FollowerService {
    public async followUser(userId: string, followerId: string): Promise<ResponseDTO> {
        try {
            // Verifica se já está seguindo o usuário
            const existingFollower = await repository.follower.findUnique({
                where: {
                    userId_followerId: {
                        userId,
                        followerId
                    }
                },
                include: {
                    user: {
                        select: {
                            username: true
                        }
                    }
                }
            });
    
            if (existingFollower) {
                return {
                    success: false,
                    code: 400,
                    message: `Você já está seguindo este usuário ${existingFollower.user.username}`,
                    data: existingFollower
                }
            }
    
            

        const newFollowData = { userId, followerId };
        const result = await repository.follower.create({
            data: newFollowData,
            include: {
                user: {
                    select: {
                        username: true
                    }
                }
            }
        });

        // Extrai o nome de usuário do usuário seguido
        const { username } = result.user;

        return {
            success: true,
            code: 201,
            message: `Agora você está seguindo o usuário @${username}`,
            data: result
        }

    } catch (error) {
        console.error("Erro ao seguir o usuário:", error);
        return {
            success: false,
            code: 400,
            message: "Erro interno do servidor",
        };
    }
}


    public async unfollowUser(userId: string, followerId: string): Promise<ResponseDTO> {
        try {
            const unfollow = await repository.follower.deleteMany({
                where: {
                    userId,
                    followerId
                }
            });
    
            
            if (unfollow.count === 0) {
                return {
                    success: false,
                    code: 400,
                    message: `Você não estava seguindo o usuário com o ID ${followerId}`,
                };
            }
    
            
            const user = await repository.user.findUnique({
                where: {
                    id: followerId
                },
                select: {
                    username: true
                }
            });
    
            
            if (!user) {
                return {
                    success: false,
                    code: 404,
                    message: `Usuário com o ID ${followerId} não encontrado`,
                };
            }
    
            const { username } = user;
    
            return {
                success: true,
                code: 200,
                message: `Deixou de seguir o usuário @${username} com sucesso`,
                data: unfollow
            };
        } catch (error) {
            console.error("Erro ao deixar de seguir o usuário:", error);
            return {
                success: false,
                code: 400,
                message: "Erro interno do servidor",
            };
        }
    }
}    