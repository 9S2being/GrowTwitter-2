export interface CreateUserDTO {
    name: string
    email: string
    password: string
    surname: string
}

export interface UpdateUserDTO {
    name?: string
    email?: string
    password?: string
    surname?: string
}