import  express  from "express";

import { TweetController } from "../controller/tweet.controller";  
import { validateToken } from "../middlewares/auth.middleware";

const router = express.Router();

const tweetController = new TweetController();

//Rotas de Tweet 

        // listar todos os tweets de um usuário
        router.get("/users/:userId/tweet",tweetController.index);

        //Criar tweet de um usuário
        router.post("/users/:userId/tweet", validateToken, tweetController.create);

        //Listar por id de tweet
        router.get('/users/:userId/tweet/:id', tweetController.show);

        //Atualiza
        router.put('/users/:userId/tweet/:id', validateToken, tweetController.update);

        //Deleta
        router.delete('/users/:userId/tweet/:id', validateToken,tweetController.delete);

        export default router;