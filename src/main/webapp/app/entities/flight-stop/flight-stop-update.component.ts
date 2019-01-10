import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFlightStop } from 'app/shared/model/flight-stop.model';
import { FlightStopService } from './flight-stop.service';
import { IAirport } from 'app/shared/model/airport.model';
import { AirportService } from 'app/entities/airport';
import { IFlight } from 'app/shared/model/flight.model';
import { FlightService } from 'app/entities/flight';

@Component({
    selector: 'jhi-flight-stop-update',
    templateUrl: './flight-stop-update.component.html'
})
export class FlightStopUpdateComponent implements OnInit {
    flightStop: IFlightStop;
    isSaving: boolean;

    airports: IAirport[];

    flights: IFlight[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected flightStopService: FlightStopService,
        protected airportService: AirportService,
        protected flightService: FlightService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ flightStop }) => {
            this.flightStop = flightStop;
        });
        this.airportService.query().subscribe(
            (res: HttpResponse<IAirport[]>) => {
                this.airports = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.flightService.query().subscribe(
            (res: HttpResponse<IFlight[]>) => {
                this.flights = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.flightStop.id !== undefined) {
            this.subscribeToSaveResponse(this.flightStopService.update(this.flightStop));
        } else {
            this.subscribeToSaveResponse(this.flightStopService.create(this.flightStop));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFlightStop>>) {
        result.subscribe((res: HttpResponse<IFlightStop>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAirportById(index: number, item: IAirport) {
        return item.id;
    }

    trackFlightById(index: number, item: IFlight) {
        return item.id;
    }
}
