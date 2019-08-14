import { ISeat } from 'app/shared/model//seat.model';
import { ICompany } from 'app/shared/model//company.model';

export interface IPlane {
    id?: number;
    manufacturer?: string;
    model?: string;
    registration?: string;
    rowsCount?: number;
    colsCount?: number;
    deleted?: boolean;
    seats?: ISeat[];
    company?: ICompany;
}

export class Plane implements IPlane {
    constructor(
        public id?: number,
        public manufacturer?: string,
        public model?: string,
        public registration?: string,
        public rowsCount?: number,
        public colsCount?: number,
        public deleted?: boolean,
        public seats?: ISeat[],
        public company?: ICompany
    ) {
        this.deleted = this.deleted || false;
    }
}
