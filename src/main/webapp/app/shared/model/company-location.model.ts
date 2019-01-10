import { ICity } from 'app/shared/model//city.model';
import { ICompany } from 'app/shared/model//company.model';

export interface ICompanyLocation {
    id?: number;
    address?: string;
    city?: ICity;
    parentCompany?: ICompany;
}

export class CompanyLocation implements ICompanyLocation {
    constructor(public id?: number, public address?: string, public city?: ICity, public parentCompany?: ICompany) {}
}
