import { IFlight } from 'app/shared/model//flight.model';
import { IIsaUser } from 'app/shared/model//isa-user.model';

export interface IFlightTicket {
    id?: number;
    seatRow?: number;
    seatCol?: number;
    flight?: IFlight;
    user?: IIsaUser;
}

export class FlightTicket implements IFlightTicket {
    constructor(public id?: number, public seatRow?: number, public seatCol?: number, public flight?: IFlight, public user?: IIsaUser) {}
}
