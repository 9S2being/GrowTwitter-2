import  express  from "express";

import { LikeController } from "../controller/like.controller";
import { validateToken } from "../middlewares/auth.middleware";


const router = express.Router();

const likeController = new LikeController();

 
 //rotas de Like 

        //Dar like
        router.post("/users/:userId/tweet/:tweetId/like", validateToken, likeController.createLike);

        // Obtem todos os likes de um tweet
        router.get("/users/:userId/tweet/:tweetId/like/:likeId", validateToken, likeController.getLikesByTweetId);

        // Remover Like do tweet
        router.delete("/users/:userId/tweet/:tweetId/like/:likeId", validateToken, likeController.deleteLike);

        export default router;