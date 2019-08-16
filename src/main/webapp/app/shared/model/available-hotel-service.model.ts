import { IHotelService } from 'app/shared/model//hotel-service.model';
import { IHotel } from 'app/shared/model//hotel.model';

export interface IAvailableHotelService {
    id?: number;
    price?: number;
    discount?: number;
    deleted?: boolean;
    hotelService?: IHotelService;
    hotel?: IHotel;
}

export class AvailableHotelService implements IAvailableHotelService {
    constructor(
        public id?: number,
        public price?: number,
        public discount?: number,
        public deleted?: boolean,
        public hotelService?: IHotelService,
        public hotel?: IHotel
    ) {
        this.deleted = this.deleted || false;
    }
}
