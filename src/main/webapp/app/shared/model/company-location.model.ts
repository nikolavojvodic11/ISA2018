import { ICar } from 'app/shared/model//car.model';
import { IHotel } from 'app/shared/model//hotel.model';
import { ICity } from 'app/shared/model//city.model';
import { ICompany } from 'app/shared/model//company.model';

export interface ICompanyLocation {
    id?: number;
    address?: string;
    phone?: string;
    email?: string;
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
        public cars?: ICar[],
        public hotels?: IHotel[],
        public city?: ICity,
        public company?: ICompany
    ) {}
}
