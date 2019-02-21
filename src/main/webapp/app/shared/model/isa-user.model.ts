import { IUser } from 'app/core/user/user.model';
import { ICity } from 'app/shared/model//city.model';
import { ICompany } from 'app/shared/model//company.model';
import { IReservation } from 'app/shared/model//reservation.model';

export interface IIsaUser {
    id?: number;
    phone?: string;
    firstLogin?: boolean;
    jhiUser?: IUser;
    city?: ICity;
    company?: ICompany;
    reservations?: IReservation[];
}

export class IsaUser implements IIsaUser {
    constructor(
        public id?: number,
        public phone?: string,
        public firstLogin?: boolean,
        public jhiUser?: IUser,
        public city?: ICity,
        public company?: ICompany,
        public reservations?: IReservation[]
    ) {
        this.firstLogin = this.firstLogin || false;
    }
}
