import  express  from "express";

import { UserController } from "../controller/user.controller";
import { validateToken } from "../middlewares/auth.middleware";

const router = express.Router();

const userController = new UserController();

    //Rotas de Usuário

        //listar usuários 
        router.get("/users", userController.index);

        //Cadastrar usuário
        router.post("/users", userController.create);

        //Buscar usuário
        router.get('/users/:id', userController.show);

        //Atualizar informações de usuário
        router.put('/users/:id', validateToken, userController.update);

        //Deletar conta do usuário
        router.delete('/users/:id/', validateToken, userController.delete);

export default router;



