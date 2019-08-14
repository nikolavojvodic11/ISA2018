import { IRoom } from 'app/shared/model//room.model';
import { IImage } from 'app/shared/model//image.model';
import { IAvailableHotelService } from 'app/shared/model//available-hotel-service.model';
import { ICompanyLocation } from 'app/shared/model//company-location.model';

export interface IHotel {
    id?: number;
    name?: string;
    description?: string;
    address?: string;
    stars?: number;
    lat?: number;
    lng?: number;
    deleted?: boolean;
    rooms?: IRoom[];
    images?: IImage[];
    availableHotelServices?: IAvailableHotelService[];
    companyLocation?: ICompanyLocation;
}

export class Hotel implements IHotel {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public address?: string,
        public stars?: number,
        public lat?: number,
        public lng?: number,
        public deleted?: boolean,
        public rooms?: IRoom[],
        public images?: IImage[],
        public availableHotelServices?: IAvailableHotelService[],
        public companyLocation?: ICompanyLocation
    ) {
        this.deleted = this.deleted || false;
    }
}
