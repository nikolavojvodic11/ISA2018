import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHotelRoomReservation } from 'app/shared/model/hotel-room-reservation.model';

@Component({
    selector: 'jhi-hotel-room-reservation-detail',
    templateUrl: './hotel-room-reservation-detail.component.html'
})
export class HotelRoomReservationDetailComponent implements OnInit {
    hotelRoomReservation: IHotelRoomReservation;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hotelRoomReservation }) => {
            this.hotelRoomReservation = hotelRoomReservation;
        });
    }

    previousState() {
        window.history.back();
    }
}
