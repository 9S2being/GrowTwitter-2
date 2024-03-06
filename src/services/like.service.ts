import { repository } from "../database/prisma.connection";
import { ResponseDTO } from "../dtos/response.dto";
import { Like } from "../models/like.model";

export class LikeService {
    public async createLike(userId: string, tweetId: string): Promise<ResponseDTO> {
        try {

            //verificar se o like ja existe
            const existingLike = await repository.like.findUnique({
                where: {
                    userId: userId,
                    tweetId: tweetId
                }
            })

            if(existingLike){
                return {
                    success: false,
                    code: 400,
                    message: "Você já curtiu este tweet",
                    data: null
                }
            }

            //criar novo like
            const newLike = new Like(userId, tweetId);

            const result = await repository.like.create({
                data: newLike
            })

            return {
                success: true,
                code: 201,
                message: "Tweet curtido com sucesso",
                data: result
            }
        } catch (error) {
            return {
                success: false,
                code: 500,
                message: "Erro ao curtir o tweet",
                data: null
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
                data: null
            }
        }
    };

    //Remove o like de um tweet
    public async deleteLike(userId: string, tweetId: string): Promise<ResponseDTO> {
        try {

            //Verifica se existe
            const existingLike = await repository.like.findUnique({
                where: {
                    userId: userId,
                    tweetId: tweetId
                }
            })

            if(!existingLike) {
                return {
                    success: false,
                    code: 400,
                    message: "Você ainda não curtiu este tweet",
                    data: null
                }
            }

            const deletedLike = await repository.like.findUnique({
                where: {
                 userId: userId, 
                    tweetId: tweetId
                }
                })

            return {
                success: true,
                code: 200,
                message: "Like removido com sucesso do tweet",
                data: deletedLike
            }
                
        } catch (error) {
            return {
                success: false,
                code: 500,
                message: "Erro ao remover o like do tweet",
                data: null
            }
        }
    }
}

