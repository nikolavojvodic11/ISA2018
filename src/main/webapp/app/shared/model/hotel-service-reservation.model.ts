import { IAvailableHotelService } from 'app/shared/model//available-hotel-service.model';
import { IReservation } from 'app/shared/model//reservation.model';

export const enum ReservationStatus {
    RESERVED = 'RESERVED',
    CONFIRMED = 'CONFIRMED',
    DELETED = 'DELETED'
}

export interface IHotelServiceReservation {
    id?: number;
    quantity?: number;
    price?: number;
    status?: ReservationStatus;
    deleted?: boolean;
    availableHotelService?: IAvailableHotelService;
    reservation?: IReservation;
}

export class HotelServiceReservation implements IHotelServiceReservation {
    constructor(
        public id?: number,
        public quantity?: number,
        public price?: number,
        public status?: ReservationStatus,
        public deleted?: boolean,
        public availableHotelService?: IAvailableHotelService,
        public reservation?: IReservation
    ) {
        this.deleted = this.deleted || false;
    }
}
