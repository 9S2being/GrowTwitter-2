import { repository } from "../database/prisma.connection";
import { ResponseDTO } from "../dtos/response.dto";
import { Like } from "../models/like.model";

export class LikeService {
    public async createLike(userId: string, tweetId: string): Promise<ResponseDTO> {
        try {
            // Registrando IDs de usuário e tweet recebidos
            console.log("userId:", userId);
            console.log("tweetId:", tweetId);
    
            // Verificar se os IDs do usuário e do tweet são válidos
            if (!userId || !tweetId || userId.trim() === '' || tweetId.trim() === '') {
                return {
                    success: false,
                    code: 400,
                    message: "IDs de usuário ou de tweet inválidos",
                    data: null
                };
            }
    
            // Verificar se o like já existe
            const existingLike = await repository.like.findUnique({
                where: {
                    userId: userId,
                    tweetId: tweetId
                }
            });
    
            if (existingLike) {
                return {
                    success: false,
                    code: 400,
                    message: "Você já curtiu este tweet",
                    data: null
                };
            }
    
            // Criar novo like
            const newLikeData = { userId, tweetId }; // Simplificação da criação do novo like
            const newLike = await repository.like.create({
                data: newLikeData
            });
    
            return {
                success: true,
                code: 201,
                message: "Tweet curtido com sucesso",
                data: newLike
            };
        } catch (error) {
            // Registrar o erro no console para depuração
            console.error("Erro ao curtir o tweet:", error);
    
            return {
                success: false,
                code: 500,
                message: "Erro ao curtir o tweet",
                data: null
            };
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
                data: null
            }
        }
    };

    //Remove o like de um tweet
    public async deleteLike(userId: string, tweetId: string): Promise<ResponseDTO> {
        try {
            // Verifica se o like existe
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
                    data: null
                };
            }
    
            // Remove o like
            await repository.like.delete({
                where: {
                    userId: userId,
                    tweetId: tweetId
                }
            });
    
            return {
                success: true,
                code: 200,
                message: "Like removido com sucesso do tweet",
                data: null
            };
        } catch (error) {
            console.error("Erro ao remover o like do tweet:", error); // Registrar o erro no console para depuração
            return {
                success: false,
                code: 500,
                message: "Erro ao remover o like do tweet",
                data: null
            };
        }
    }
}