export interface IHotelService {
    id?: number;
    serviceName?: string;
    serviceDescription?: string;
    deleted?: boolean;
}

export class HotelService implements IHotelService {
    constructor(public id?: number, public serviceName?: string, public serviceDescription?: string, public deleted?: boolean) {
        this.deleted = this.deleted || false;
    }
}
