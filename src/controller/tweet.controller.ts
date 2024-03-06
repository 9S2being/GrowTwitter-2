import { Request, Response } from "express";
import { TweetService } from "../services/tweet.service"
import { CreateTweetDTO } from "../dtos/tweet.dto"
import { ResponseDTO } from "../dtos/response.dto";


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
                success: false,
                code: response.statusCode,
                message: "Erro ao buscar tweet",
            })
        }
    }; 

    //criar tweet
   // Supondo que você tenha definido os tipos CreateTweetDTO e ResponseDTO em um arquivo separado

public async create(request: Request, response: Response): Promise<void> {
    try {
        const { id: idUser, content, type } = request.body;

        // Verificar se os campos obrigatórios foram fornecidos
        if (!idUser || !content || !type) {
            response.status(400).json({
                success: false,
                code: response.statusCode,
                message: "Preencha todos os campos obrigatórios",
            });
            return;
        }

        // Criar o objeto DTO para o tweet
        const tweetDTO: CreateTweetDTO = { idUser, content, type };

        // Chamar o serviço para criar o tweet
        const result: ResponseDTO = await tweetService.create(tweetDTO);

        // Retornar a resposta do serviço
        response.status(result.code).json(result);
    } catch (error) {
        console.error("Erro ao criar tweet:", error);
        response.status(500).json({
            success: false,
            code: response.statusCode,
            message: "Erro ao criar tweet",
        });
    }
};

    
    
    

    //atualizar tweet
    public async update(request: Request, response:Response) {
        try {
            const {tweetId ,userId} = request.params;
            const {content} = request.body;

            if(!content){
                return response.status(400).json({
                    success: false,
                    code: response.statusCode,
                    message: "Preencha os campos obrigatórios",
                })
            }

            const result = await tweetService.update({
                id: tweetId,
                content,
                idUser: userId
            })

            return response.status(result.code).json(result)

        } catch (error) {
            console.log(error)

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
            success: false,
            code: response.statusCode,
            message: "Erro ao deletar tweet"
           })
        }
    };

};