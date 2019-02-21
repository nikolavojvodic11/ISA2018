import { IAirport } from 'app/shared/model//airport.model';
import { IFlight } from 'app/shared/model//flight.model';

export interface IFlightStop {
    id?: number;
    stopNumber?: number;
    airport?: IAirport;
    flight?: IFlight;
}

export class FlightStop implements IFlightStop {
    constructor(public id?: number, public stopNumber?: number, public airport?: IAirport, public flight?: IFlight) {}
}
