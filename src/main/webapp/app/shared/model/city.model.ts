import { IAirport } from 'app/shared/model//airport.model';

export interface ICity {
    id?: number;
    name?: string;
    airports?: IAirport[];
}

export class City implements ICity {
    constructor(public id?: number, public name?: string, public airports?: IAirport[]) {}
}
