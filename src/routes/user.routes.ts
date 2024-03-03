import  express  from "express";

import { UserController } from "../controller/user.controller";
import { TweetController } from "../controller/tweet.controller";
import { LikeController } from "../controller/like.controller";

const router = express.Router();

const userController = new UserController();
const tweetController = new TweetController();
const likeController = new LikeController(); 

//Rotas de Usuário

    //listar usuários 
    router.get("/users", userController.index);

    //Cadastrar usuário
    router.post("/users", userController.create);

    //Buscar usuário
    router.get('/users/:id', userController.show);

    //Atualizar informações de usuário
    router.put('/users/:id', userController.update);

    //Deletar conta do usuário
    router.delete('/users/:id', userController.delete);


//Rotas de Tweet 

    // listar todos os tweets de um usuário
    router.get("/users/:idUser/tweet", tweetController.index);

    //Criar tweet de um usuário
    router.post("/users/:idUser/tweet", userController.create);

    //Listar por id de tweet
    router.get('/users/:idUser/tweet/:id', userController.show);

    //Atualiza
    router.put('/users/:idUser/tweet/:id', userController.update);

    //Deleta
    router.delete('/users/:idUser/:id', userController.delete);

//rotas de Like 

    //Dar like
    router.post("/users/:userId/tweet/:tweetId/like", likeController.createLike);

    // Obtem todos os likes de um tweet
    router.get("/users/:userId/tweet/:tweetId/like", likeController.getLikesByTweetId);

    // Remover Like do tweet
    router.delete("/users/:userId/tweet/:tweetId/like", likeController.deleteLike);




