import { Profile } from './profile.model';

export class User {

    public id: number;
    public profile: Profile;


    constructor(
        public firstname?: string,
        public lastname?: string,
        public email?: string,
        public username?: string,
        public password?: string
    ) { }

}
