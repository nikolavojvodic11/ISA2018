import { ISeat } from 'app/shared/model//seat.model';
import { IFlight } from 'app/shared/model//flight.model';
import { IFriendRequest } from 'app/shared/model//friend-request.model';
import { IReservation } from 'app/shared/model//reservation.model';

export const enum ReservationStatus {
    RESERVED = 'RESERVED',
    CONFIRMED = 'CONFIRMED',
    DELETED = 'DELETED'
}

export interface IFlightSeatReservation {
    id?: number;
    firstName?: string;
    lastName?: string;
    passportNumber?: string;
    status?: ReservationStatus;
    price?: number;
    seat?: ISeat;
    flight?: IFlight;
    friendRequest?: IFriendRequest;
    reservation?: IReservation;
}

export class FlightSeatReservation implements IFlightSeatReservation {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public passportNumber?: string,
        public status?: ReservationStatus,
        public price?: number,
        public seat?: ISeat,
        public flight?: IFlight,
        public friendRequest?: IFriendRequest,
        public reservation?: IReservation
    ) {}
}
