export interface IHotelService {
    id?: number;
    serviceName?: string;
    serviceDescription?: string;
}

export class HotelService implements IHotelService {
    constructor(public id?: number, public serviceName?: string, public serviceDescription?: string) {}
}
