import { Request, Response } from "express";
import { UserService } from "../services/user.service"
import { CreateUserDTO } from "../dtos/user.dto";


const userService = new UserService();

export class UserController {
    public async index(request:Request, response: Response) {
        try {
            const users = await userService.findAll()

            return response.status(200).json(users);
        } catch (error) {
            return response.status(500).json({
                sucess: false,
                code: response.statusCode,
                message: "Erro ao listar usuários",
            })
        }
    };

    public async create(request:Request, response: Response) {
        try {
            const {name,email,password,username} = request.body

            if(!name || !email || !password || !username) {
                return response.status(400).json({
                    sucess: false,
                    code: response.statusCode,
                    message: "Preencha todos os campos",
                })
            };

            const user: CreateUserDTO = {name,email,password,username}

            const result = await userService.create(user);

            return response.status(result.code).json(result)

        } catch (error) {
            
            console.log(error)
            return response.status(500).json({
                sucess: false,
                code: response.statusCode,
                message: "Erro ao cadastrar usuário",
            })
        }
    };

    public async show(request: Request, response: Response) {
        try {
            const { id } = request.params
    
            const result = await userService.findById(id);
    
            return response.status(result.code).json(result);
    
        } catch (error) {
            return response.status(500).json({
                success: false,
                code: response.statusCode,
                message: "Erro ao buscar usuário",
            })
        }
    };
    

    public async update(request:Request,response:Response) {
        try {
            const { id } = request.params
            const {name,email,password,username} = request.body

            const result = await userService.update({
                    id,
                    name,
                    email,
                    password,
                    username,
            })

            response.status(result.code).json(result)

        } catch (error) {
            return response.status(500).json({
                sucess: false,
                code: response.statusCode,
                message: "Erro ao atualizar usuário",
            })
        }
    };

    public async delete(request:Request,response:Response) {
        try {
            const { id } = request.params
            const result = await userService.delete(id)

            response.status(result.code).json(result);

            } catch (error) {
              return response.status(400).json({
                sucess: false,
                code: response.statusCode,
                message: "Erro ao deletar usuário",
            })  
        }
    }
};
