import { ICity } from 'app/shared/model//city.model';

export interface IAirport {
    id?: number;
    name?: string;
    address?: string;
    city?: ICity;
}

export class Airport implements IAirport {
    constructor(public id?: number, public name?: string, public address?: string, public city?: ICity) {}
}
