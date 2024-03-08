import { repository } from "../database/prisma.connection";
import { ResponseDTO } from "../dtos/response.dto";

export class LikeService {
    //Dar like em um tweet
    public async createLike(userId: string, tweetId: string): Promise<ResponseDTO> {
        try {
            
            
            if (!userId || !tweetId || userId.trim() === '' || tweetId.trim() === '') {
                return {
                    success: false,
                    code: 400,
                    message: "IDs de usuário ou de tweet inválidos",
                }
            }
    
           
            const existingLike = await repository.like.findUnique({
                where: {
                    userId: userId,
                    tweetId: tweetId
                }
            })
    
            if (existingLike) {
                return {
                    success: false,
                    code: 400,
                    message: "Você já curtiu este tweet",
                }
            }
    
            
            const newLikeData = { userId, tweetId };

            const newLike = await repository.like.create({
                data: newLikeData
            })
    
            return {
                success: true,
                code: 201,
                message: "Tweet curtido com sucesso",
                data: newLike
            };
        } catch (error) {
            return {
                success: false,
                code: 500,
                message: "Erro ao curtir o tweet",
            }
        }
    };
    
    
    //Retorna os likes de um tweet especifico 
    public async getLikesByTweetId(tweetId: string): Promise<ResponseDTO> {
        try {
            const likes = await repository.like.findMany({
                where: {
                    tweetId: tweetId
                }
            })

            return {
                success: true,
                code: 200,
                message: "Likes encontrados para o tweet",
                data: likes

            }
            
        } catch (error) {
            return {
                success: false,
                code: 500,
                message: "Erro ao encontrar os likes do tweet",
            
            }
        }
    };

    //Remove o like de um tweet
    public async deleteLike(userId: string, tweetId: string): Promise<ResponseDTO> {
        try {
            
            const existingLike = await repository.like.findUnique({
                where: {
                    userId: userId,
                    tweetId: tweetId
                }
            });
    
            if (!existingLike) {
                return {
                    success: false,
                    code: 400,
                    message: "Você ainda não curtiu este tweet",
                    
                };
            }
    
            
        const removedLike =  await repository.like.delete({
                where: {
                    userId: userId,
                    tweetId: tweetId
                }
            });
    
            return {
                success: true,
                code: 200,
                message: "Like removido com sucesso do tweet",
                data: removedLike
               
            };
        } catch (error) {
            return {
                success: false,
                code: 400,
                message: "Erro ao remover o like do tweet",
            }
        }
    };
}