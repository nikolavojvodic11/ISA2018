import { IIsaUser } from 'app/shared/model//isa-user.model';

export interface IFriendRequest {
    id?: number;
    accepted?: boolean;
    sender?: IIsaUser;
    reciver?: IIsaUser;
}

export class FriendRequest implements IFriendRequest {
    constructor(public id?: number, public accepted?: boolean, public sender?: IIsaUser, public reciver?: IIsaUser) {
        this.accepted = this.accepted || false;
    }
}
