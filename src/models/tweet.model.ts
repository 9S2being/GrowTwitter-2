import { TweetType } from "@prisma/client";
import { randomUUID } from "crypto";

export class Tweet {
  private _id: string;

  constructor(
    private _content: string,
    private _type: TweetType,
    private _idUser: string
    
  ) {
    this._id = randomUUID()
  }

  get id(): string {
    return this._id
  }

  get content(): string {
    return this._content
  }

  get type(): string {
    return this._type
  }

  get idUser(): string {
    return this._idUser
  }
}

export { TweetType };

