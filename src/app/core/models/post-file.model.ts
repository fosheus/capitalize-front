export class PostFile {

    public id: number;
    public path: string;
    public name: string;
    public type: string;
    public text?= '';
    public binary?: File;
    public modified?= false;
    public deleted?= false;
    constructor() {
    }


}
