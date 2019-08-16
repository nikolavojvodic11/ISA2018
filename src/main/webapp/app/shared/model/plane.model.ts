import { ICompany } from 'app/shared/model//company.model';

export interface IPlane {
    id?: number;
    manufacturer?: string;
    model?: string;
    registration?: string;
    rowsCount?: number;
    colsCount?: number;
    unavailableSeats?: string;
    deleted?: boolean;
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
        public unavailableSeats?: string,
        public deleted?: boolean,
        public company?: ICompany
    ) {
        this.deleted = this.deleted || false;
    }
}
