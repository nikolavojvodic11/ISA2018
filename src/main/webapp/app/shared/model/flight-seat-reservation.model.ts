import { IFlight } from 'app/shared/model//flight.model';
import { IIsaUser } from 'app/shared/model//isa-user.model';
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
    flightNumber?: number;
    seatRow?: number;
    seatCol?: string;
    business?: boolean;
    price?: number;
    discount?: number;
    airlineRating?: number;
    flightRating?: number;
    pointsEarned?: number;
    deleted?: boolean;
    flight?: IFlight;
    user?: IIsaUser;
    reservation?: IReservation;
}

export class FlightSeatReservation implements IFlightSeatReservation {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public passportNumber?: string,
        public status?: ReservationStatus,
        public flightNumber?: number,
        public seatRow?: number,
        public seatCol?: string,
        public business?: boolean,
        public price?: number,
        public discount?: number,
        public airlineRating?: number,
        public flightRating?: number,
        public pointsEarned?: number,
        public deleted?: boolean,
        public flight?: IFlight,
        public user?: IIsaUser,
        public reservation?: IReservation
    ) {
        this.business = this.business || false;
        this.deleted = this.deleted || false;
    }
}
