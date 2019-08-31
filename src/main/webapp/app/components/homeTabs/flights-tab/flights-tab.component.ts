import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FlightReservationSteps } from 'app/constants/FlightReservationSteps';
import { IFlight } from '../../../shared/model/flight.model';
import { AccountService } from '../../../core';
import { JhiAlertService } from 'ng-jhipster';
import { IReservation } from '../../../shared/model/reservation.model';
import { IFlightSeatReservation } from '../../../shared/model/flight-seat-reservation.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'jhi-flights-tab',
    templateUrl: './flights-tab.component.html',
    styles: []
})
export class FlightsTabComponent implements OnInit {
    @Output() setActiveTab: EventEmitter<string> = new EventEmitter<string>();
    currentStep: FlightReservationSteps;
    searchFormData: object;
    arrivalFlight: IFlight;
    departureFlight: IFlight;
    reservation: IReservation;
    flightSeatReservationsDeparture: IFlightSeatReservation[];
    flightSeatReservationsArrival: IFlightSeatReservation[];
    flightSeatReservationAssignmentToInvitedUserComplete: boolean = false;

    constructor(
        protected accountService: AccountService,
        protected jhiAlertService: JhiAlertService,
        protected route: ActivatedRoute,
        protected router: Router
    ) {
        this.currentStep = FlightReservationSteps.SEARCH;
    }

    ngOnInit() {
        if (this.route.snapshot.queryParamMap.get('activeTab')) {
            this.setActiveTab.emit(this.route.snapshot.queryParamMap.get('activeTab'));
            this.router.navigate([], { replaceUrl: true });
        }
    }

    public onSearchButtonClick(event: MouseEvent): void {
        // @ts-ignore
        this.searchFormData = event.data;
        this.currentStep = FlightReservationSteps.RESULTS;
    }

    public onFlightProceedClick(event: MouseEvent): void {
        // @ts-ignore
        this.arrivalFlight = event.data.arrivalFlight;
        // @ts-ignore
        this.departureFlight = event.data.departureFlight;
        // @ts-ignore
        this.reservation = event.data.reservation;

        this.currentStep = FlightReservationSteps.SEATS;
    }

    public setFlightSeatReservations(flightSeatReservations: IFlightSeatReservation[]): void {
        if (flightSeatReservations[0].flight.id == this.departureFlight.id) {
            this.flightSeatReservationsDeparture = flightSeatReservations;
        } else {
            this.flightSeatReservationsArrival = flightSeatReservations;
        }
    }

    setFlightSeatReservationAssignmentToInvitedUserComplete(value) {
        this.flightSeatReservationAssignmentToInvitedUserComplete = value;
    }

    nextStep(event) {
        if (this.currentStep === FlightReservationSteps.SEATS) {
            this.currentStep = FlightReservationSteps.INVITE;
        } else if (this.currentStep === FlightReservationSteps.INVITE) {
            this.currentStep = FlightReservationSteps.PASSENGERS;
        }
    }

    finishFlightReservation(event) {
        this.setActiveTab.emit('my-reservations-tab');
    }

    continueToHotelBooking(event) {
        localStorage.setItem('reservation', JSON.stringify(this.reservation));
        localStorage.setItem('flightSeatReservations', JSON.stringify(this.flightSeatReservationsDeparture));
        localStorage.setItem('flightSearchFormData', JSON.stringify(this.searchFormData));
        this.setActiveTab.emit('hotels-tab');
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
