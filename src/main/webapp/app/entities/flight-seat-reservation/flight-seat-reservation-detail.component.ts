import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFlightSeatReservation } from 'app/shared/model/flight-seat-reservation.model';

@Component({
    selector: 'jhi-flight-seat-reservation-detail',
    templateUrl: './flight-seat-reservation-detail.component.html'
})
export class FlightSeatReservationDetailComponent implements OnInit {
    flightSeatReservation: IFlightSeatReservation;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ flightSeatReservation }) => {
            this.flightSeatReservation = flightSeatReservation;
        });
    }

    previousState() {
        window.history.back();
    }
}
