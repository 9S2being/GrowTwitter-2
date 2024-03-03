import  express  from "express";

import { UserController } from "../controller/user.controller";
import { TweetController } from "../controller/tweet.controller";

const router = express.Router();

const userController = new UserController();
const tweetController = new TweetController();

//Rotas de Usuário

//lista
router.get("/users", userController.index);

//Criar
router.post("/users", userController.create);

//pesquisa
router.get('/users/:id', userController.show);

//Atualiza
router.put('/users/:id', userController.update);

//Deleta
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




