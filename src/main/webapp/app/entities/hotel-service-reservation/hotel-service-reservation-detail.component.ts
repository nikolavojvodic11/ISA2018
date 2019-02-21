import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHotelServiceReservation } from 'app/shared/model/hotel-service-reservation.model';

@Component({
    selector: 'jhi-hotel-service-reservation-detail',
    templateUrl: './hotel-service-reservation-detail.component.html'
})
export class HotelServiceReservationDetailComponent implements OnInit {
    hotelServiceReservation: IHotelServiceReservation;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hotelServiceReservation }) => {
            this.hotelServiceReservation = hotelServiceReservation;
        });
    }

    previousState() {
        window.history.back();
    }
}
