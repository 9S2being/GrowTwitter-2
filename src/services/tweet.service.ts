
import { error } from "console";
import { repository } from "../database/prisma.connection";
import { ResponseDTO } from "../dtos/response.dto";
import { CreateTweetDTO, UpdateTweetDTO } from "../dtos/tweet.dto";


//Listar tweets
export class TweetService {
    public async findAll(idUser: string): Promise<ResponseDTO> {
        try {
            const tweets = await repository.tweet.findMany({
                where: {
                    userId: idUser
                }
            });

            if (!tweets) {
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
                data: tweets
            };
        } catch (error) {

          
            return {
                success: false,
                code: 400,
                message: "Erro ao listar tweets" ,
                data: null
            };

            

        }
    }
    

    //Criar tweets
  //Supondo que você tenha definido os tipos CreateUserDTO, CreateTweetDTO e ResponseDTO em um arquivo separado

  public async create(tweetDTO: CreateTweetDTO): Promise<ResponseDTO> {
    try {
        // Procurar o usuário pelo ID fornecido
        const user = await repository.user.findFirst({
            where: { id: tweetDTO.idUser }
        });

        // Verificar se o usuário existe
        if (!user) {
            return {
                success: false,
                code: 404,
                message: "User not found",
            };
        }

        // Criar o tweet associado ao usuário
        const createdTweet = await repository.tweet.create({
            data: {
                content: tweetDTO.content,
                type: tweetDTO.type,
                userId: tweetDTO.idUser
            }
        });

        // Retornar uma resposta de sucesso com o tweet criado
        return {
            success: true,
            code: 201,
            message: "Tweet created successfully.",
            data: createdTweet
        };
    } catch (error) {
        console.error("Error creating tweet:", error);
        return {
            success: false,
            code: 400,
            message: "Error creating tweet",
        };
    }
};


    
    
    
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
    };

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
            where: {id: id}
        })

        if(tweet){
            throw new Error("Tweet não encontrado")
        }

        const result = await repository.tweet.delete({
            where: {
                id: id
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




