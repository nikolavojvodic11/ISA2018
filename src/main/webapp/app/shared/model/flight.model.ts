import { Moment } from 'moment';
import { IAirport } from 'app/shared/model//airport.model';
import { IPlane } from 'app/shared/model//plane.model';

export interface IFlight {
    id?: number;
    departureTime?: Moment;
    arrivalTime?: Moment;
    flightDuration?: number;
    flightDistance?: number;
    price?: number;
    discount?: number;
    code?: string;
    deleted?: boolean;
    departureAirport?: IAirport;
    arrivalAirport?: IAirport;
    plane?: IPlane;
}

export class Flight implements IFlight {
    constructor(
        public id?: number,
        public departureTime?: Moment,
        public arrivalTime?: Moment,
        public flightDuration?: number,
        public flightDistance?: number,
        public price?: number,
        public discount?: number,
        public code?: string,
        public deleted?: boolean,
        public departureAirport?: IAirport,
        public arrivalAirport?: IAirport,
        public plane?: IPlane
    ) {
        this.deleted = this.deleted || false;
    }
}
