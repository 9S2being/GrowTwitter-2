// models/reply.model.ts
import { randomUUID } from "crypto";

export class Reply {
    private _id: string;

    constructor(
        private _content: string,
        private _userId: string,
        private _tweetId: string
    ) {
        this._id = randomUUID();
    }

    get id(): string {
        return this._id;
    }

    get content(): string {
        return this._content;
    }

    get userId(): string {
        return this._userId;
    }

    get tweetId(): string {
        return this._tweetId;
    }
}
