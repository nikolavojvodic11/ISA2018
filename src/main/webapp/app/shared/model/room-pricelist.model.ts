import { Moment } from 'moment';
import { IRoom } from 'app/shared/model//room.model';

export interface IRoomPricelist {
    id?: number;
    dateFrom?: Moment;
    dateTo?: Moment;
    price?: number;
    deleted?: boolean;
    room?: IRoom;
}

export class RoomPricelist implements IRoomPricelist {
    constructor(
        public id?: number,
        public dateFrom?: Moment,
        public dateTo?: Moment,
        public price?: number,
        public deleted?: boolean,
        public room?: IRoom
    ) {
        this.deleted = this.deleted || false;
    }
}
