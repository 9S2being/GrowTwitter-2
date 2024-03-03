import { response } from "express";
import { repository } from "../database/prisma.connection";
import { ResponseDTO } from "../dtos/response.dto";
import { CreateTweetDTO, UpdateTweetDTO } from "../dtos/tweet.dto";
import { Tweet, TweetType } from "../models/tweet.model";

//Listar tweets
export class TweetService {
    public async findAll(idUser: string): Promise<ResponseDTO> {
        try {
            const user = await repository.user.findUnique({
                where: {
                    id: idUser
                },
                include: {
                    tweets: true
                }
            });

            if (!user) {
                return {
                    success: false,
                    code: 404,
                    message: "Usuário não encontrado",
                    data: null
                };
            }

            return {
                success: true,
                code: 200,
                message: "Tweets listados com sucesso",
                data: user.tweets 
            };
        } catch (error) {
            return {
                success: false,
                code: 500,
                message: "Erro ao listar tweets",
                data: null
            };
        }
    }

    //Criar tweets
    public async create(tweetDTO: CreateTweetDTO): Promise<ResponseDTO> {
        const user = await repository.user.findUnique({
            where: {
                id: tweetDTO.idUser
            }
        })

        if (!user) {
            throw new Error("Usuário não encontrado").cause
        }

        const newTweet = new Tweet(
            tweetDTO.content,
            tweetDTO.type as TweetType,
            tweetDTO.idUser
        )

        const createdTweet = await repository.tweet.create({
            data: {
                content: newTweet.content,
                type: newTweet.type as TweetType,
                userId: newTweet.idUser
            }
        })

        return {
            success: true,
            code: 201,
            message: "Tweet criado com sucesso.",
            data: createdTweet
        }
    }

    //encontrar tweet especifico
    public async findById(idUser: string, id: string): Promise<ResponseDTO> {
        const tweet = await repository.tweet.findUnique({
            where: {id}
        })

        if(!tweet){
            throw new Error("Tweet não encontrado")
        }

        if (tweet.userId !== idUser) {
            throw new Error(`O tweet ${tweet} não existe`);
        }

        return {
            success: true,
            code: 200,
            message: "Tweet encontrado com sucesso",
            data: tweet
        }
    }

    //atualizar tweet
    public async update(tweetDTO: UpdateTweetDTO): Promise<ResponseDTO> {
        const user = await repository.user.findUnique({
            where: {
                id: tweetDTO.idUser
            }
        })

        if(!user) {
            throw new Error("Usuário não encontrado")
        }

        const tweet = await repository.tweet.findUnique({
            where: {
                id: tweetDTO.id
            }
        })

        if(!tweet) {
            throw new Error("Tweet não encontrado")
        }

    const result = await repository.tweet.update({
        where: {
            id: tweetDTO.id
        },
        data: {
            content: tweetDTO.content
        }
    }) 

        return {
            success: true,
            code: 200,
            message: "Tweet atualizado com sucesso",
            data: result
        }
    };
    
    //Deletar tweet
    public async delete(id: string, idUser: string): Promise<ResponseDTO>{
        const user = await repository.user.findUnique({
            where: {
                id: idUser
            }
        })

        if(!user) {
            throw new Error("Usuário não encontrado")
        }
        
        
        const tweet = await repository.tweet.findUnique({
            where: {id}
        })

        if(tweet){
            throw new Error("Tweet não encontrado")
        }

        const result = await repository.tweet.delete({
            where: {
                id
            }
        })

        return {
            success: true,
            code: 200,
            message: "Tweet excluido com sucesso",
            data: result
        }
    };    
    
};




