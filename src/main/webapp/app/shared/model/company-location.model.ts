import { ICar } from 'app/shared/model//car.model';
import { IHotel } from 'app/shared/model//hotel.model';
import { ICity } from 'app/shared/model//city.model';
import { ICompany } from 'app/shared/model//company.model';

export interface ICompanyLocation {
    id?: number;
    address?: string;
    phone?: string;
    email?: string;
    lat?: number;
    lng?: number;
    deleted?: boolean;
    cars?: ICar[];
    hotels?: IHotel[];
    city?: ICity;
    company?: ICompany;
}

export class CompanyLocation implements ICompanyLocation {
    constructor(
        public id?: number,
        public address?: string,
        public phone?: string,
        public email?: string,
        public lat?: number,
        public lng?: number,
        public deleted?: boolean,
        public cars?: ICar[],
        public hotels?: IHotel[],
        public city?: ICity,
        public company?: ICompany
    ) {
        this.deleted = this.deleted || false;
    }
}
