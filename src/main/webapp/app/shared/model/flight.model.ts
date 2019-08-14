import { Moment } from 'moment';
import { IFlightStop } from 'app/shared/model//flight-stop.model';
import { IAirport } from 'app/shared/model//airport.model';
import { IPlane } from 'app/shared/model//plane.model';
import { ICompany } from 'app/shared/model//company.model';

export interface IFlight {
    id?: number;
    departureTime?: Moment;
    arrivalTime?: Moment;
    flightDuration?: number;
    flightDistance?: number;
    stopsCount?: number;
    price?: number;
    discount?: number;
    code?: string;
    deleted?: boolean;
    flightStops?: IFlightStop[];
    departureAirport?: IAirport;
    arrivalAirport?: IAirport;
    plane?: IPlane;
    company?: ICompany;
}

export class Flight implements IFlight {
    constructor(
        public id?: number,
        public departureTime?: Moment,
        public arrivalTime?: Moment,
        public flightDuration?: number,
        public flightDistance?: number,
        public stopsCount?: number,
        public price?: number,
        public discount?: number,
        public code?: string,
        public deleted?: boolean,
        public flightStops?: IFlightStop[],
        public departureAirport?: IAirport,
        public arrivalAirport?: IAirport,
        public plane?: IPlane,
        public company?: ICompany
    ) {
        this.deleted = this.deleted || false;
    }
}
