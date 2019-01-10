import { IUser } from 'app/core/user/user.model';
import { ICity } from 'app/shared/model//city.model';
import { ICompany } from 'app/shared/model//company.model';

export interface IIsaUser {
    id?: number;
    phone?: string;
    jhiUser?: IUser;
    city?: ICity;
    company?: ICompany;
}

export class IsaUser implements IIsaUser {
    constructor(public id?: number, public phone?: string, public jhiUser?: IUser, public city?: ICity, public company?: ICompany) {}
}
