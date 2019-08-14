import { IHotelServiceReservation } from 'app/shared/model//hotel-service-reservation.model';
import { IHotelRoomReservation } from 'app/shared/model//hotel-room-reservation.model';
import { IFlightSeatReservation } from 'app/shared/model//flight-seat-reservation.model';
import { ICarReservation } from 'app/shared/model//car-reservation.model';
import { IIsaUser } from 'app/shared/model//isa-user.model';

export const enum ReservationType {
    STANDARD = 'STANDARD',
    QUICK = 'QUICK'
}

export interface IReservation {
    id?: number;
    discount?: number;
    type?: ReservationType;
    total?: number;
    deleted?: boolean;
    hotelServiceReservations?: IHotelServiceReservation[];
    hotelRoomReservations?: IHotelRoomReservation[];
    flightSeatReservations?: IFlightSeatReservation[];
    carReservations?: ICarReservation[];
    user?: IIsaUser;
}

export class Reservation implements IReservation {
    constructor(
        public id?: number,
        public discount?: number,
        public type?: ReservationType,
        public total?: number,
        public deleted?: boolean,
        public hotelServiceReservations?: IHotelServiceReservation[],
        public hotelRoomReservations?: IHotelRoomReservation[],
        public flightSeatReservations?: IFlightSeatReservation[],
        public carReservations?: ICarReservation[],
        public user?: IIsaUser
    ) {
        this.deleted = this.deleted || false;
    }
}
