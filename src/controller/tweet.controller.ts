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
    public async show(request: Request, response: Response): Promise<void> {
        try {
            const { userId, id } = request.params;
    
            // Verificar se userId e id foram fornecidos
            if (!userId || !id) {
                response.status(400).json({
                    success: false,
                    code: 400,
                    message: "Missing user ID or tweet ID",
                });
                return;
            }
    
            const result = await tweetService.findById(userId, id);
    
            response.status(200).json(result);
        } catch (error) {
            console.error("Error fetching tweet:", error);
            response.status(500).json({
                success: false,
                code: 500,
                message: "Error fetching tweet",
            });
        }
    };
    
    //criar tweet
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
   // Certifique-se de importar a interface UpdateTweetDTO corretamente

   public async update(request: Request, response: Response): Promise<void> {
    try {
        const { userId, id } = request.params;
        const { content } = request.body;

        // Verificar se o conteúdo do tweet foi fornecido
        if (!content) {
            response.status(400).json({
                success: false,
                code: 400,
                message: "Content is required",
            });
            return;
        }

        // Atualizar o tweet
        const result = await tweetService.update({
            id: id,
            content: content,
            idUser: userId
        });

        // Retornar o resultado da atualização
        response.status(result.code).json(result);
    } catch (error) {
        console.error("Error updating tweet:", error);
        response.status(500).json({
            success: false,
            code: 500,
            message: "Error updating tweet",
        });
    }
}


    //deletar tweet
    public async delete(request: Request, response: Response): Promise<void> {
        try {
            const { id, userId } = request.params;
    
            // Verificar se o tweet foi excluído com sucesso
            const result = await tweetService.delete(id, userId);
    
            // Retornar a resposta
            response.status(result.code).json(result);
        } catch (error) {
            console.error("Error deleting tweet:", error);
    
            // Se ocorrer um erro, retornar uma resposta com status 500
            response.status(500).json({
                success: false,
                code: 500,
                message: "Error deleting tweet",
            });
        }
    }
    

};