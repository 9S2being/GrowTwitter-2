import  express  from "express";

import { UserController } from "../controller/user.controller";
import { LikeController } from "../controller/like.controller";
import { FollowerController } from "../controller/follow.controller";
import { ReplyController } from "../controller/reply.controller";

const router = express.Router();

const userController = new UserController();
const likeController = new LikeController(); 
const followerController = new FollowerController();
const replyController = new ReplyController();

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
        router.delete('/users/:id/', userController.delete);

export default router;



