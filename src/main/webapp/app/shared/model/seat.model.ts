import { IPlane } from 'app/shared/model//plane.model';

export interface ISeat {
    id?: number;
    row?: number;
    col?: number;
    deleted?: boolean;
    plane?: IPlane;
}

export class Seat implements ISeat {
    constructor(public id?: number, public row?: number, public col?: number, public deleted?: boolean, public plane?: IPlane) {
        this.deleted = this.deleted || false;
    }
}
