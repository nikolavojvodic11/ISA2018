import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IFlight } from 'app/shared/model/flight.model';
import { FlightService } from './flight.service';
import { IAirport } from 'app/shared/model/airport.model';
import { AirportService } from 'app/entities/airport';
import { IPlane } from 'app/shared/model/plane.model';
import { PlaneService } from 'app/entities/plane';

@Component({
    selector: 'jhi-flight-update',
    templateUrl: './flight-update.component.html'
})
export class FlightUpdateComponent implements OnInit {
    flight: IFlight;
    isSaving: boolean;

    airports: IAirport[];

    planes: IPlane[];
    departureTime: string;
    arrivalTime: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected flightService: FlightService,
        protected airportService: AirportService,
        protected planeService: PlaneService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ flight }) => {
            this.flight = flight;
            this.departureTime = this.flight.departureTime != null ? this.flight.departureTime.format(DATE_TIME_FORMAT) : null;
            this.arrivalTime = this.flight.arrivalTime != null ? this.flight.arrivalTime.format(DATE_TIME_FORMAT) : null;
        });
        this.airportService.query().subscribe(
            (res: HttpResponse<IAirport[]>) => {
                this.airports = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.planeService.query().subscribe(
            (res: HttpResponse<IPlane[]>) => {
                this.planes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.flight.departureTime = this.departureTime != null ? moment(this.departureTime, DATE_TIME_FORMAT) : null;
        this.flight.arrivalTime = this.arrivalTime != null ? moment(this.arrivalTime, DATE_TIME_FORMAT) : null;
        if (this.flight.id !== undefined) {
            this.subscribeToSaveResponse(this.flightService.update(this.flight));
        } else {
            this.subscribeToSaveResponse(this.flightService.create(this.flight));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFlight>>) {
        result.subscribe((res: HttpResponse<IFlight>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPlaneById(index: number, item: IPlane) {
        return item.id;
    }
}
