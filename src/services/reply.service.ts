// services/reply.service.ts
import { repository } from "../database/prisma.connection";
import { ResponseDTO } from "../dtos/response.dto";
import { Reply } from "../models/reply.model";

export class ReplyService {
    public async createReply(content: string, userId: string, tweetId: string): Promise<ResponseDTO> {
        try {
            const newReply = new Reply(content, userId, tweetId);
            const createdReply = await repository.reply.create({
                data: {
                    content: newReply.content,
                    userId: newReply.userId,
                    tweetId: newReply.tweetId
                }
            });

            return {
                success: true,
                code: 201,
                message: "Resposta criada com sucesso",
                data: createdReply
            };
        } catch (error) {
            return {
                success: false,
                code: 400,
                message: "Erro ao criar resposta.",
                
            };
        }
    };

    public async getReplyById(replyId: string): Promise<ResponseDTO> {
        try {
            const reply = await repository.reply.findUnique({
                where: { id: replyId }
            })

            if (!reply) {
                return {
                    success: false,
                    code: 404,
                    message: "Resposta não encontrada",
                    
                }
            }

            return {
                success: true,
                code: 200,
                message: "Resposta encontrada",
                data: reply
            }

        } catch (error) {
            return {
                success: false,
                code: 400,
                message: "Erro ao buscar resposta",
              
            }
        }
    };

    public async updateReply(replyId: string, content: string): Promise<ResponseDTO> {
        try {
            const updatedReply = await repository.reply.update({
                where: { id: replyId },
                data: { content }
            });

            return {
                success: true,
                code: 200,
                message: "Resposta atualizada com sucesso",
                data: updatedReply

            };
        } catch (error) {
            return {
                success: false,
                code: 400,
                message: "Erro ao atualizar resposta",
                
            }
        }
    };

    public async deleteReply(replyId: string): Promise<ResponseDTO> {
        try {
            await repository.reply.delete({ where: { id: replyId } });

            return {
                success: true,
                code: 200,
                message: "Resposta excluída com sucesso",
                
            }

        } catch (error) {
            return {
                success: false,
                code: 400,
                message: "Erro ao excluir resposta",
                
            }

        }
    };
}
