import { ICity } from 'app/shared/model//city.model';

export interface IAirport {
    id?: number;
    name?: string;
    code?: string;
    address?: string;
    city?: ICity;
}

export class Airport implements IAirport {
    constructor(public id?: number, public name?: string, public code?: string, public address?: string, public city?: ICity) {}
}
