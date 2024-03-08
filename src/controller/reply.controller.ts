// controllers/reply.controller.ts
import { Request, Response } from "express";
import { ReplyService } from "../services/reply.service";

const replyService = new ReplyService();

export class ReplyController {
    public async createReply(request:Request, response:Response) {
        try {
            
            const { content, userId, tweetId } = request.body;

            const result = await replyService.createReply(content, userId, tweetId)

            response.status(result.code).json(result)

        } catch (error) {
            response.status(500).json({
                success: false,
                code: 500,
                message: "Erro interno do servidor.",
            })
        }
    };

    public async getReplyById(request:Request, response:Response) {
        try {
            const replyId = request.params.replyId

            const result = await replyService.getReplyById(replyId)

            response.status(result.code).json(result)

        } catch (error) {
            response.status(500).json({
                success: false,
                code: 400,
                message: "Erro interno do servidor",
            })
        }
    };

    public async updateReply(request:Request, response:Response) {
        try {

            const replyId = request.params.replyId
            
            const { content } = request.body

            const result = await replyService.updateReply(replyId, content)

            response.status(result.code).json(result);

        } catch (error) {
            response.status(500).json({
                success: false,
                code: 400,
                message: "Erro interno do servidor",
            })
        }
    };

    public async deleteReply(request:Request, response:Response) {
        try {

            const replyId = request.params.replyId

            const result = await replyService.deleteReply(replyId)

            response.status(result.code).json(result)

        } catch (error) {
            response.status(500).json({
                success: false,
                code: 400,
                message: "Erro interno do servidor",
            })
        }
    };

};
