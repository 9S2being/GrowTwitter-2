
import  express  from "express";

import { ReplyController } from "../controller/reply.controller";

const router = express.Router();

const replyController = new ReplyController();

//Reply

        // Criar uma resposta a um tweet
        router.post("/users/:userId/tweet/:tweetId/reply", replyController.createReply);

        // Obter uma resposta específica 
        router.get("/users/:userId/tweet/:tweetId/reply", replyController.getReplyById);

        // Atualizar uma resposta 
        router.put("/users/:userId/tweet/:tweetId/reply", replyController.updateReply);

        // Excluir uma resposta 
        router.delete("/users/:userId/tweet/:tweetId/reply", replyController.deleteReply);

        export default router;