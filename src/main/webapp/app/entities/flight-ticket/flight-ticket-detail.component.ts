import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFlightTicket } from 'app/shared/model/flight-ticket.model';

@Component({
    selector: 'jhi-flight-ticket-detail',
    templateUrl: './flight-ticket-detail.component.html'
})
export class FlightTicketDetailComponent implements OnInit {
    flightTicket: IFlightTicket;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ flightTicket }) => {
            this.flightTicket = flightTicket;
        });
    }

    previousState() {
        window.history.back();
    }
}
