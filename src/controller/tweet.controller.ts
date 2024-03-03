import { Request, Response } from "express";

import { TweetService } from "../services/tweet.service"
import { CreateTweetDTO, UpdateTweetDTO } from "../dtos/tweet.dto";
import { repository } from "../database/prisma.connection";


const tweetService = new TweetService();

//listar todos 
export class TweetController {
    public async index(request:Request, response: Response) {
       const { idUser } = request.params
       
       const result = await tweetService.findAll(idUser)

       return response.status(result.code).json(result)
    };

    //buscar tweet especifico
    public async show(request:Request, response: Response) {
        try {
            const {idUser, id} = request.params

            const result = await tweetService.findById(idUser, id)

            return response.status(200).json(result)
        } catch (error) {
            return response.status(500).json({
                sucess: false,
                code: response.statusCode,
                message: "Erro ao buscar tweet",
            })
        }
    };

    //criar tweet
    public async create(request: Request,response:Response) {
        try {
            const {idUser} = request.params;
            const {content, type} = request.body;

            if(!content || !type){
                return response.status(400).json({
                    sucess: false,
                    code: response.statusCode,
                    message: "Preencha os campos obrigatórios",
                })
            }

            const tweet: CreateTweetDTO = { content, type, idUser}

            const result = await tweetService.create(tweet)

            return response.status(result.code).json(result)

            } catch(error) {
                return response.status(500).json({
                    sucess: false,
                    code: response.statusCode,
                    message: "Erro ao criar tweet",
            })
        }
    }

    //atualizar tweet
    public async update(request: Request, response:Response) {
        try {
            const {id, idUser} = request.params;
            const {content} = request.body;

            if(!content){
                return response.status(400).json({
                    sucess: false,
                    code: response.statusCode,
                    message: "Preencha os campos obrigatórios",
                })
            }

            const result = await tweetService.update({
                id,
                content,
                idUser
            })

            return response.status(result.code).json(result)

        } catch (error) {
            return response.status(500).json({
                success: false,
                code: response.statusCode,
                message: "Erro ao atualizar tweet"
            })
        }
    };

    //deletar tweet
    public async delete(request:Request, response: Response) {
        try {
            const {id, idUser} = request.params

            const result = await tweetService.delete(id, idUser)

            return response.status(result.code).json(result)
        } catch (error) {
           return response.status(500).json({
            sucess: false,
            code: response.statusCode,
            message: "Erro ao deletar tweet"
           })
        }
    };

};