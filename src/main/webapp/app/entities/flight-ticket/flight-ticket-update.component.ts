import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFlightTicket } from 'app/shared/model/flight-ticket.model';
import { FlightTicketService } from './flight-ticket.service';
import { IFlight } from 'app/shared/model/flight.model';
import { FlightService } from 'app/entities/flight';
import { IIsaUser } from 'app/shared/model/isa-user.model';
import { IsaUserService } from 'app/entities/isa-user';

@Component({
    selector: 'jhi-flight-ticket-update',
    templateUrl: './flight-ticket-update.component.html'
})
export class FlightTicketUpdateComponent implements OnInit {
    flightTicket: IFlightTicket;
    isSaving: boolean;

    flights: IFlight[];

    isausers: IIsaUser[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected flightTicketService: FlightTicketService,
        protected flightService: FlightService,
        protected isaUserService: IsaUserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ flightTicket }) => {
            this.flightTicket = flightTicket;
        });
        this.flightService.query().subscribe(
            (res: HttpResponse<IFlight[]>) => {
                this.flights = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.isaUserService.query().subscribe(
            (res: HttpResponse<IIsaUser[]>) => {
                this.isausers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.flightTicket.id !== undefined) {
            this.subscribeToSaveResponse(this.flightTicketService.update(this.flightTicket));
        } else {
            this.subscribeToSaveResponse(this.flightTicketService.create(this.flightTicket));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFlightTicket>>) {
        result.subscribe((res: HttpResponse<IFlightTicket>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackFlightById(index: number, item: IFlight) {
        return item.id;
    }

    trackIsaUserById(index: number, item: IIsaUser) {
        return item.id;
    }
}
