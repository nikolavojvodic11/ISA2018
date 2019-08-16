import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFlightSeatReservation } from 'app/shared/model/flight-seat-reservation.model';
import { FlightSeatReservationService } from './flight-seat-reservation.service';
import { IFlight } from 'app/shared/model/flight.model';
import { FlightService } from 'app/entities/flight';
import { IIsaUser } from 'app/shared/model/isa-user.model';
import { IsaUserService } from 'app/entities/isa-user';
import { IReservation } from 'app/shared/model/reservation.model';
import { ReservationService } from 'app/entities/reservation';

@Component({
    selector: 'jhi-flight-seat-reservation-update',
    templateUrl: './flight-seat-reservation-update.component.html'
})
export class FlightSeatReservationUpdateComponent implements OnInit {
    flightSeatReservation: IFlightSeatReservation;
    isSaving: boolean;

    flights: IFlight[];

    isausers: IIsaUser[];

    reservations: IReservation[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected flightSeatReservationService: FlightSeatReservationService,
        protected flightService: FlightService,
        protected isaUserService: IsaUserService,
        protected reservationService: ReservationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ flightSeatReservation }) => {
            this.flightSeatReservation = flightSeatReservation;
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
        this.reservationService.query().subscribe(
            (res: HttpResponse<IReservation[]>) => {
                this.reservations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.flightSeatReservation.id !== undefined) {
            this.subscribeToSaveResponse(this.flightSeatReservationService.update(this.flightSeatReservation));
        } else {
            this.subscribeToSaveResponse(this.flightSeatReservationService.create(this.flightSeatReservation));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFlightSeatReservation>>) {
        result.subscribe(
            (res: HttpResponse<IFlightSeatReservation>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackReservationById(index: number, item: IReservation) {
        return item.id;
    }
}
