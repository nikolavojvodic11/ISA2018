import { IPlane } from 'app/shared/model//plane.model';

export interface ISeat {
    id?: number;
    row?: number;
    col?: number;
    plane?: IPlane;
}

export class Seat implements ISeat {
    constructor(public id?: number, public row?: number, public col?: number, public plane?: IPlane) {}
}
