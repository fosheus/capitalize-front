import { User } from "src/app/auth/models/user.model";
import { Tag } from "./tag.model";
import { File } from "./file.model";

export class Post {

    constructor(id?: number,
        title?: string,
        text?: string,
        validationDate?: Date,
        createdAt?: Date,
        updatedAt?: Date,
        validated?: boolean,
        owner?: User,
        validator?: User,
        tags?: Tag[],
        files?: File[]) {

    }
}
