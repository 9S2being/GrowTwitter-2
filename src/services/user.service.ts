import { repository } from "../database/prisma.connection";

import { ResponseDTO } from "../dtos/response.dto";

import { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto";
import { User } from "../models/user.model";

export class UserService {
    public async findAll(): Promise<ResponseDTO> {
        const users = await repository.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                username: true,
                password: true,
                
            }
        })
        
            return {
                success: true,
                code: 200,
                message: "Users listados com sucesso",
                data: users
            }
        };

        public async create(userDTO: CreateUserDTO): Promise<ResponseDTO> {
            const newUser = new User(
                userDTO.name,
                userDTO.email,
                userDTO.password,
                userDTO.username
            )

            const CreatedUser = await repository.user.create({
                data: {
                    name: newUser.name,
                    email: newUser.email,
                    username: newUser.username,
                    password: newUser.password
                }
            })

            return {
                success: true,
                code: 201,
                message: "Usuário criado com sucesso",
                data: CreatedUser
            }
        };

        public async findById(id: string): Promise<ResponseDTO> {
            const user = await repository.user.findUnique({
                where: { id }
            })

            if(!user) {
                throw new Error("Usuário não encontrado")
            }

            return {
                success: true,
                code: 200,
                message: "Usuário encontrado com sucesso",
                data: user
            }
        };

        public async update(userDTO: UpdateUserDTO): Promise<ResponseDTO> {
            const user = await repository.user.findUnique({
                where: {
                    id: userDTO.id
                }
            })

            if(user) {
                throw new Error("Usuário não encontrado")
        }

        const updatedUser = await repository.user.update({
            where: {
                id: userDTO.id
            },
            data: {
                name: userDTO.name,
                email: userDTO.email,
                username: userDTO.username,
                password: userDTO.password
            }
        })

        return {
            success: true,
            code: 200,
            message: "Usuário atualizado com sucesso",
            data: updatedUser
        }
    };

    public async delete(id: string): Promise<ResponseDTO> {
        const user = await repository.user.findUnique({
            where: { id: id }
        })

        if(!user) {
            throw new Error("Usuário não encontrado")
        }

        const deletedUser = await repository.user.delete({
            where: { id: id }
        })

        return {
            success: true,
            code: 200,
            message: "Usuário deletado com sucesso",
            data: deletedUser
        }
    };
}