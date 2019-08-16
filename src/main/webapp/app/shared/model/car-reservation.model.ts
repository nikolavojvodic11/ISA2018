import { Moment } from 'moment';
import { ICar } from 'app/shared/model//car.model';
import { IReservation } from 'app/shared/model//reservation.model';

export const enum ReservationStatus {
    RESERVED = 'RESERVED',
    CONFIRMED = 'CONFIRMED',
    DELETED = 'DELETED'
}

export interface ICarReservation {
    id?: number;
    dateFrom?: Moment;
    dateTo?: Moment;
    status?: ReservationStatus;
    price?: number;
    discount?: number;
    hotelRating?: number;
    roomRating?: number;
    deleted?: boolean;
    car?: ICar;
    carReservation?: IReservation;
}

export class CarReservation implements ICarReservation {
    constructor(
        public id?: number,
        public dateFrom?: Moment,
        public dateTo?: Moment,
        public status?: ReservationStatus,
        public price?: number,
        public discount?: number,
        public hotelRating?: number,
        public roomRating?: number,
        public deleted?: boolean,
        public car?: ICar,
        public carReservation?: IReservation
    ) {
        this.deleted = this.deleted || false;
    }
}
