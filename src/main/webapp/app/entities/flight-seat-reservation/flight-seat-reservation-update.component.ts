import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFlightSeatReservation } from 'app/shared/model/flight-seat-reservation.model';
import { FlightSeatReservationService } from './flight-seat-reservation.service';
import { ISeat } from 'app/shared/model/seat.model';
import { SeatService } from 'app/entities/seat';
import { IFlight } from 'app/shared/model/flight.model';
import { FlightService } from 'app/entities/flight';
import { IFriendRequest } from 'app/shared/model/friend-request.model';
import { FriendRequestService } from 'app/entities/friend-request';
import { IReservation } from 'app/shared/model/reservation.model';
import { ReservationService } from 'app/entities/reservation';

@Component({
    selector: 'jhi-flight-seat-reservation-update',
    templateUrl: './flight-seat-reservation-update.component.html'
})
export class FlightSeatReservationUpdateComponent implements OnInit {
    flightSeatReservation: IFlightSeatReservation;
    isSaving: boolean;

    seats: ISeat[];

    flights: IFlight[];

    friendrequests: IFriendRequest[];

    reservations: IReservation[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected flightSeatReservationService: FlightSeatReservationService,
        protected seatService: SeatService,
        protected flightService: FlightService,
        protected friendRequestService: FriendRequestService,
        protected reservationService: ReservationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ flightSeatReservation }) => {
            this.flightSeatReservation = flightSeatReservation;
        });
        this.seatService.query().subscribe(
            (res: HttpResponse<ISeat[]>) => {
                this.seats = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.flightService.query().subscribe(
            (res: HttpResponse<IFlight[]>) => {
                this.flights = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.friendRequestService.query().subscribe(
            (res: HttpResponse<IFriendRequest[]>) => {
                this.friendrequests = res.body;
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

    trackSeatById(index: number, item: ISeat) {
        return item.id;
    }

    trackFlightById(index: number, item: IFlight) {
        return item.id;
    }

    trackFriendRequestById(index: number, item: IFriendRequest) {
        return item.id;
    }

    trackReservationById(index: number, item: IReservation) {
        return item.id;
    }
}
