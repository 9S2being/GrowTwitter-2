export interface CreateUserDTO {
    name: string
    email: string
    username: string
    password: string
    
}

export interface UpdateUserDTO {
    id: string
    name?: string
    email?: string
    username?: string
    password?: string
    
}