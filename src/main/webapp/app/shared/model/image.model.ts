import { ICompany } from 'app/shared/model//company.model';
import { ICar } from 'app/shared/model//car.model';
import { IHotel } from 'app/shared/model//hotel.model';
import { IRoom } from 'app/shared/model//room.model';

export interface IImage {
    id?: number;
    path?: string;
    company?: ICompany;
    car?: ICar;
    hotel?: IHotel;
    room?: IRoom;
}

export class Image implements IImage {
    constructor(
        public id?: number,
        public path?: string,
        public company?: ICompany,
        public car?: ICar,
        public hotel?: IHotel,
        public room?: IRoom
    ) {}
}
