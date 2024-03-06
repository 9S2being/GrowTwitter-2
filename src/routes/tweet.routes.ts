import  express  from "express";

import { TweetController } from "../controller/tweet.controller";

const router = express.Router();

const tweetController = new TweetController();

//Rotas de Tweet 

        // listar todos os tweets de um usuário
        router.get("/users/:userId/tweet", tweetController.index);

        //Criar tweet de um usuário
        router.post("/users/:userId/tweet",  tweetController.create);

        //Listar por id de tweet
        router.get('/users/:userId/tweet/:tweetId',  tweetController.show);

        //Atualiza
        router.put('/users/:userId/tweet/:tweetId', tweetController.update);

        //Deleta
        router.delete('/users/:userId/tweet/:tweetId', tweetController.delete);

        export default router;