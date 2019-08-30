import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { FlightService } from '../../../entities/flight';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IFlight } from '../../../shared/model/flight.model';
import { JhiAlertService } from 'ng-jhipster';
import { IReservation, Reservation, ReservationType } from '../../../shared/model/reservation.model';
import { ReservationService } from 'app/entities/reservation';
import { AccountService, LoginModalService } from '../../../core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-flights-tab-preview',
    templateUrl: './flights-tab-preview.component.html',
    styles: []
})
export class FlightsTabPreviewComponent implements OnInit, OnChanges {
    @Input() searchFormData: object;
    @Output() nextStep: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    flights: IFlight[];
    departureFlightChoosen: boolean;
    departureFlight: IFlight;
    arrivalFlightChoosen: boolean;
    arrivalFlight: IFlight;
    reservation: IReservation;
    modalRef: NgbModalRef;

    constructor(
        protected flightService: FlightService,
        protected reservationService: ReservationService,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        private loginModalService: LoginModalService
    ) {}

    ngOnInit() {
        this.getFlights();
    }

    ngOnChanges() {}

    getFlights() {
        this.flightService.query(this.searchFormData).subscribe(
            (res: HttpResponse<IFlight[]>) => {
                this.flights = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    setDepartureFlight(flight) {
        this.departureFlight = flight;
    }

    setArrivalFlight(flight) {
        this.arrivalFlight = flight;
    }

    proceed(event) {
        if (!this.accountService.isAuthenticated()) {
            this.modalRef = this.loginModalService.open();
            return;
        }
        this.reservation = new Reservation();
        this.reservation.discount = 0;
        this.reservation.type = ReservationType.STANDARD;
        this.reservation.total = 0;
        this.reservation.deleted = false;

        this.reservationService.create(this.reservation).subscribe(
            (res: HttpResponse<IReservation>) => {
                this.reservation = res.body;
                const data = {
                    departureFlight: this.departureFlight,
                    arrivalFlight: this.arrivalFlight,
                    reservation: this.reservation
                };
                event.data = data;
                this.nextStep.emit(event);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    back(event) {
        alert('back');
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
