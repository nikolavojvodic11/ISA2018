import { ICompany } from 'app/shared/model//company.model';

export interface IPlane {
    id?: number;
    manufacturer?: string;
    model?: string;
    registration?: string;
    rowsCount?: number;
    colsCount?: number;
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
        public company?: ICompany
    ) {}
}
