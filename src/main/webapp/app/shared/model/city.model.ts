import { IAirport } from 'app/shared/model//airport.model';

export interface ICity {
    id?: number;
    name?: string;
    deleted?: boolean;
    airports?: IAirport[];
}

export class City implements ICity {
    constructor(public id?: number, public name?: string, public deleted?: boolean, public airports?: IAirport[]) {
        this.deleted = this.deleted || false;
    }
}
