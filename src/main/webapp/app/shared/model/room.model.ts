import { IRoomPricelist } from 'app/shared/model//room-pricelist.model';
import { IImage } from 'app/shared/model//image.model';
import { IHotel } from 'app/shared/model//hotel.model';

export interface IRoom {
    id?: number;
    bedsCount?: number;
    label?: string;
    deleted?: boolean;
    roomPricelists?: IRoomPricelist[];
    images?: IImage[];
    hotel?: IHotel;
}

export class Room implements IRoom {
    constructor(
        public id?: number,
        public bedsCount?: number,
        public label?: string,
        public deleted?: boolean,
        public roomPricelists?: IRoomPricelist[],
        public images?: IImage[],
        public hotel?: IHotel
    ) {
        this.deleted = this.deleted || false;
    }
}
