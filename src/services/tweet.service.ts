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
            })

            if (!tweets) {
                return {
                    success: false,
                    code: 404,
                    message: "Usuário não encontrado",
                    
                }
            }

            return {
                success: true,
                code: 200,
                message: "Tweets listados com sucesso",
                data: tweets
            };

        }catch (error) {
            return {
                success: false,
                code: 400,
                message: "Erro ao listar tweets" ,
            }
        }
    };
    

    //Criar tweets
    public async create(tweetDTO: CreateTweetDTO): Promise<ResponseDTO> {
        try {
            
            const user = await repository.user.findUnique({
                where: { id: tweetDTO.idUser }
            });

            
            if (!user) {
                return {
                    success: false,
                    code: 404,
                    message: "Usuário não encontrado",
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

            
            return {
                success: true,
                code: 201,
                message: "Tweet criado com sucesso",
                data: createdTweet
            };
        } catch (error) {
            
            return {
                success: false,
                code: 400,
                message: "Erro ao criar tweet",
            };
        }
    };

    //encontrar tweet especifico
    public async findById(idUser: string, id: string): Promise<ResponseDTO> {
        try {
            
            const tweet = await repository.tweet.findFirst({
                where: { id }
            })

            
            if (!tweet) {
                return {
                    success: false,
                    code: 404,
                    message: "Tweet não encontrado",
                }
            }

            
            if (tweet.userId !== idUser) {
                return {
                    success: false,
                    code: 403,
                    message: `Este tweet: (${id}), não pertence ao usuário (${idUser})`,
                }
            }

            
            return {
                success: true,
                code: 200,
                message: "Tweet encontrado com sucesso",
                data: tweet
            }

        } catch (error) {
            return {
                success: false,
                code: 500,
                message: "Erro ao buscar tweet",
            }
        }
    };


    //atualizar tweet
    public async update(tweetDTO: UpdateTweetDTO): Promise<ResponseDTO> {
        try {
            // Verificar se os dados de entrada são fornecidos corretamente
            if (!tweetDTO.idUser || !tweetDTO.id || !tweetDTO.content) {
                return {
                    success: false,
                    code: 400,
                    message: "Preencha todos os campos",
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
                    message: "Tweet não encontrado",
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
    
            return {
                success: true,
                code: 200,
                message: "Tweet atualizado com sucesso",
                data: updatedTweet
            };
        } catch (error) {
            return {
                success: false,
                code: 500,
                message: "Erro ao tentar atualizar tweet",
            };
        }
    }
    
    
    //Deletar tweet
    public async delete(id: string, idUser: string): Promise<ResponseDTO> {
        try {
            // Verificar se o usuário existe
            const user = await repository.user.findUnique({
                where: { id: idUser }
            });
    
            if (!user) {
                return {
                    success: false,
                    code: 404,
                    message: "Usuário não encontrado",
                };
            }
    
            const tweet = await repository.tweet.findUnique({
                where: { id }
            });
    
            if (!tweet) {
                return {
                    success: false,
                    code: 404,
                    message: "Tweet não encontrado",
                };
            }
    
           
            if (tweet.userId !== idUser) {
                return {
                    success: false,
                    code: 403,
                    message: "Tweet não pertence a esse usuário",
                };
            }
    
            
       const deletedTweet = await repository.tweet.delete({
                 where: {
                     id 
                    } 
                })
    
            return {
                success: true,
                code: 200,
                message: "Tweet deletado com sucesso",
                data: deletedTweet
            };
        } catch (error) {
            return {
                success: false,
                code: 400,
                message: "Erro ao deletar tweet",
            }
        }
    }
};