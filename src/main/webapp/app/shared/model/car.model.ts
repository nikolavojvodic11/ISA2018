import { IImage } from 'app/shared/model//image.model';
import { ICompanyLocation } from 'app/shared/model//company-location.model';

export const enum CarType {
    HATCHBACK = 'HATCHBACK',
    LIMOUSINE = 'LIMOUSINE',
    SUV = 'SUV'
}

export interface ICar {
    id?: number;
    manufacturer?: string;
    model?: string;
    registration?: string;
    color?: string;
    seats?: number;
    type?: CarType;
    price?: number;
    discount?: number;
    deleted?: boolean;
    images?: IImage[];
    companyLocation?: ICompanyLocation;
}

export class Car implements ICar {
    constructor(
        public id?: number,
        public manufacturer?: string,
        public model?: string,
        public registration?: string,
        public color?: string,
        public seats?: number,
        public type?: CarType,
        public price?: number,
        public discount?: number,
        public deleted?: boolean,
        public images?: IImage[],
        public companyLocation?: ICompanyLocation
    ) {
        this.deleted = this.deleted || false;
    }
}
