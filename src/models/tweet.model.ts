import { randomUUID } from "crypto";

export class User {
  private _id: string;

  constructor(
    private _content: string
    
  ) {
    this._id = randomUUID()
  }

  get id(): string {
    return this._id
  }

  get content(): string {
    return this._content
  }
}

