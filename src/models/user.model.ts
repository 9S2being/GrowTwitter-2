import { randomUUID } from "crypto";

export class User {
  private _id: string;

  constructor(
    private _name: string,
    private _email: string,
    private _password: string,
    private _surname: string
  ) {
    this._id = randomUUID()
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get email(): string {
    return this._email
  }

  get password(): string {
    return this._password
  }

  get surname(): string {
    return this._surname
  }
}