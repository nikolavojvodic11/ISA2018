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
    businessPrice?: number;
    freeBags?: number;
    freeCarryOnBags?: number;
    pricePerAdditionalBag?: number;
    maxBagsAllowed?: number;
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
        public businessPrice?: number,
        public freeBags?: number,
        public freeCarryOnBags?: number,
        public pricePerAdditionalBag?: number,
        public maxBagsAllowed?: number,
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
