import { ICity } from 'app/shared/model//city.model';

export interface IAirport {
    id?: number;
    name?: string;
    code?: string;
    address?: string;
    lat?: number;
    lng?: number;
    deleted?: boolean;
    city?: ICity;
}

export class Airport implements IAirport {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public address?: string,
        public lat?: number,
        public lng?: number,
        public deleted?: boolean,
        public city?: ICity
    ) {
        this.deleted = this.deleted || false;
    }
}
