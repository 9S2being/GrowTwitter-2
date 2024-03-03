export interface CreateTweetDTO {
    content: string
    type: string
    idUser: string
  
}

export interface UpdateTweetDTO {
   id: string
   content: string
   idUser: string
}