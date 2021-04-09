export class PostFile {

    public id: number;
    public path: string;
    public name: string;
    public type: string;
    public content: string = '';
    public binary: File;
    public modified = false;
    public set: boolean;
    constructor() {
    }


}
