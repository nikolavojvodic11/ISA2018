import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICarReservation } from 'app/shared/model/car-reservation.model';

@Component({
    selector: 'jhi-car-reservation-detail',
    templateUrl: './car-reservation-detail.component.html'
})
export class CarReservationDetailComponent implements OnInit {
    carReservation: ICarReservation;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ carReservation }) => {
            this.carReservation = carReservation;
        });
    }

    previousState() {
        window.history.back();
    }
}
