import  express  from "express";

import { LikeController } from "../controller/like.controller";


const router = express.Router();

const likeController = new LikeController();
 
 //rotas de Like 

        //Dar like
        router.post("/users/:userId/tweet/:tweetId/like", likeController.createLike);

        // Obtem todos os likes de um tweet
        router.get("/users/:userId/tweet/:tweetId/like/:likeId", likeController.getLikesByTweetId);

        // Remover Like do tweet
        router.delete("/users/:userId/tweet/:tweetId/like/:likeId", likeController.deleteLike);

        export default router;