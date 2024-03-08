import { randomUUID } from "crypto";

export class Follow {
  private _id: string;

  constructor(
    private _userId: string,
    private _followerId: string
  ) {
    this._id = randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get followerId(): string {
    return this._followerId;
  }
}
