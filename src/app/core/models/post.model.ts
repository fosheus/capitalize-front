import { User } from "src/app/auth/models/user.model";
import { PostTag } from "./post-tag.model";
import { File } from "./file.model";

export class Post {

    constructor(public id?: number,
        public title?: string,
        public text?: string,
        public validationDate?: Date,
        public createdAt?: Date,
        public updatedAt?: Date,
        public validated?: boolean,
        public owner?: User,
        public validator?: User,
        public tags?: PostTag[],
        public files?: File[]) {

    }
}
