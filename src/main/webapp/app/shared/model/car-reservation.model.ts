import { Moment } from 'moment';
import { ICar } from 'app/shared/model//car.model';
import { IReservation } from 'app/shared/model//reservation.model';

export interface ICarReservation {
    id?: number;
    dateFrom?: Moment;
    dateTo?: Moment;
    price?: number;
    car?: ICar;
    carReservation?: IReservation;
}

export class CarReservation implements ICarReservation {
    constructor(
        public id?: number,
        public dateFrom?: Moment,
        public dateTo?: Moment,
        public price?: number,
        public car?: ICar,
        public carReservation?: IReservation
    ) {}
}
