import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFlightStop } from 'app/shared/model/flight-stop.model';

@Component({
    selector: 'jhi-flight-stop-detail',
    templateUrl: './flight-stop-detail.component.html'
})
export class FlightStopDetailComponent implements OnInit {
    flightStop: IFlightStop;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ flightStop }) => {
            this.flightStop = flightStop;
        });
    }

    previousState() {
        window.history.back();
    }
}
