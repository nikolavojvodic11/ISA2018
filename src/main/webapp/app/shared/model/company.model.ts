import { ICompanyLocation } from 'app/shared/model//company-location.model';
import { IPlane } from 'app/shared/model//plane.model';
import { ICompanyType } from 'app/shared/model//company-type.model';

export interface ICompany {
    id?: number;
    name?: string;
    description?: string;
    companyLocations?: ICompanyLocation[];
    planes?: IPlane[];
    companyType?: ICompanyType;
}

export class Company implements ICompany {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public companyLocations?: ICompanyLocation[],
        public planes?: IPlane[],
        public companyType?: ICompanyType
    ) {}
}
