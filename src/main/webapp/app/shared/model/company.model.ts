import { ICompanyLocation } from 'app/shared/model//company-location.model';
import { IPlane } from 'app/shared/model//plane.model';
import { IImage } from 'app/shared/model//image.model';

export const enum CompanyType {
    AIRLINE = 'AIRLINE',
    HOTEL = 'HOTEL',
    CAR_RENTAL = 'CAR_RENTAL'
}

export interface ICompany {
    id?: number;
    name?: string;
    description?: string;
    website?: string;
    phone?: string;
    email?: string;
    type?: CompanyType;
    companyLocations?: ICompanyLocation[];
    planes?: IPlane[];
    images?: IImage[];
}

export class Company implements ICompany {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public website?: string,
        public phone?: string,
        public email?: string,
        public type?: CompanyType,
        public companyLocations?: ICompanyLocation[],
        public planes?: IPlane[],
        public images?: IImage[]
    ) {}
}
