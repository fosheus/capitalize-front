import { User } from 'src/app/core/models/user.model';
import { PostTag } from './post-tag.model';
import { PostFile } from './post-file.model';

export class Post {

    public id: number;
    public title: string;
    public description: string;
    public validationDate: Date;
    public createdAt: Date;
    public updatedAt: Date;
    public validated: boolean;
    public owner: User;
    public validator: User;
    public tags: PostTag[];
    public files: PostFile[];

    constructor() {

    }
}
