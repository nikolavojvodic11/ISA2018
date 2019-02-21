import { Moment } from 'moment';
import { IRoom } from 'app/shared/model//room.model';
import { IReservation } from 'app/shared/model//reservation.model';

export const enum ReservationStatus {
    RESERVED = 'RESERVED',
    CONFIRMED = 'CONFIRMED',
    DELETED = 'DELETED'
}

export interface IHotelRoomReservation {
    id?: number;
    dateFrom?: Moment;
    dateTo?: Moment;
    status?: ReservationStatus;
    price?: number;
    room?: IRoom;
    reservation?: IReservation;
}

export class HotelRoomReservation implements IHotelRoomReservation {
    constructor(
        public id?: number,
        public dateFrom?: Moment,
        public dateTo?: Moment,
        public status?: ReservationStatus,
        public price?: number,
        public room?: IRoom,
        public reservation?: IReservation
    ) {}
}
