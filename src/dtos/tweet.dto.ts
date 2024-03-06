import { TweetType } from "@prisma/client"

export interface CreateTweetDTO {
    content: string
    type: TweetType
    idUser: string
  
}

export interface UpdateTweetDTO {
   id: string
   content: string
   idUser: string
}