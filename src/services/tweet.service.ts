
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
                }, 
                include: {
                    user: true,
                    replies: true,
                    likes: true
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
        try {
            // Procurar o tweet pelo ID fornecido
            const tweet = await repository.tweet.findFirst({
                where: { id }
            });

            // Verificar se o tweet foi encontrado
            if (!tweet) {
                return {
                    success: false,
                    code: 404,
                    message: "Tweet not found",
                };
            }

            // Verificar se o tweet pertence ao usuário
            if (tweet.userId !== idUser) {
                return {
                    success: false,
                    code: 403,
                    message: `Forbidden: This tweet (${id}) does not belong to the user (${idUser})`,
                };
            }

            // Retornar uma resposta de sucesso com o tweet encontrado
            return {
                success: true,
                code: 200,
                message: "Tweet found successfully",
                data: tweet
            };
        } catch (error) {
            console.error("Error finding tweet:", error);
            return {
                success: false,
                code: 500,
                message: "Error finding tweet",
            };
        }
    }


    //atualizar tweet
    public async update(tweetDTO: UpdateTweetDTO): Promise<ResponseDTO> {
        try {
            // Verificar se os dados de entrada são fornecidos corretamente
            if (!tweetDTO.idUser || !tweetDTO.id || !tweetDTO.content) {
                return {
                    success: false,
                    code: 400,
                    message: "Missing required fields",
                };
            }
    
            // Verificar se o tweet existe
            const tweet = await repository.tweet.findUnique({
                where: {
                    id: tweetDTO.id
                }
            });
    
            // Se o tweet não for encontrado, retornar um erro
            if (!tweet) {
                return {
                    success: false,
                    code: 404,
                    message: "Tweet not found",
                };
            }
    
            // Atualizar o tweet com o conteúdo fornecido
            const updatedTweet = await repository.tweet.update({
                where: {
                    id: tweetDTO.id
                },
                data: {
                    content: tweetDTO.content
                }
            });
    
            // Retornar uma resposta indicando que o tweet foi atualizado com sucesso
            return {
                success: true,
                code: 200,
                message: "Tweet updated successfully",
                data: updatedTweet
            };
        } catch (error) {
            // Se ocorrer algum erro durante o processo, retornar uma resposta de erro
            console.error("Error updating tweet:", error);
            return {
                success: false,
                code: 500,
                message: "Error updating tweet",
            };
        }
    }
    
    
    //Deletar tweet
    public async delete(id: string, idUser: string): Promise<ResponseDTO> {
        try {
            console.log("Starting tweet deletion...");
            console.log("Tweet ID:", id);
            console.log("User ID:", idUser);
    
            // Verificar se o usuário existe
            const user = await repository.user.findUnique({
                where: { id: idUser }
            });
            
            console.log("User:", user);
    
            if (!user) {
                console.log("User not found.");
                return {
                    success: false,
                    code: 404,
                    message: "User not found",
                };
            }
    
            // Verificar se o tweet pertence ao usuário
            const tweet = await repository.tweet.findUnique({
                where: { id }
            });
    
            console.log("Tweet:", tweet);
    
            if (!tweet) {
                console.log("Tweet not found.");
                return {
                    success: false,
                    code: 404,
                    message: "Tweet not found",
                };
            }
    
            // Verificar se o tweet pertence ao usuário
            if (tweet.userId !== idUser) {
                console.log("Tweet does not belong to the user.");
                return {
                    success: false,
                    code: 403,
                    message: "Forbidden: This tweet does not belong to the user",
                };
            }
    
            // Excluir o tweet
            await repository.tweet.delete({ where: { id } });
    
            console.log("Tweet deleted successfully.");
            return {
                success: true,
                code: 200,
                message: "Tweet deleted successfully",
            };
        } catch (error) {
            console.error("Error deleting tweet:", error);
            return {
                success: false,
                code: 500,
                message: "Error deleting tweet",
            };
        }
    }
    
    
};