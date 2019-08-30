import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IFlight } from '../../../shared/model/flight.model';
import { IReservation } from '../../../shared/model/reservation.model';
import { IFlightSeatReservation } from '../../../shared/model/flight-seat-reservation.model';
import { FlightSeatReservationService } from '../../../entities/flight-seat-reservation';
import { JhiAlertService } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-flights-tab-passengers',
    templateUrl: './flights-tab-passengers.component.html',
    styles: []
})
export class FlightsTabPassengersComponent implements OnInit {
    @Input() searchFormData: object;
    @Input() departureFlight: IFlight;
    @Input() arrivalFlight: IFlight;
    @Input() reservation: IReservation;
    @Input() flightSeatReservationsDeparture: IFlightSeatReservation[];
    @Input() flightSeatReservationsArrival: IFlightSeatReservation[];
    @Output() finishReservation: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    @Output() continueToHotelBooking: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    showNextStepButtons: boolean = false;

    constructor(protected flightSeatReservationService: FlightSeatReservationService, protected jhiAlertService: JhiAlertService) {}

    ngOnInit() {}

    onInputChange(event, flightSeatReservationIndex, fieldName) {
        this.flightSeatReservationsArrival[flightSeatReservationIndex][fieldName] = event.target.value;
    }

    onSaveClick() {
        let updatedCount = 0;
        for (let index in this.flightSeatReservationsDeparture) {
            this.updateFlightSeatReservations(this.flightSeatReservationsDeparture[index], updatedCount);
            updatedCount += 1;
            if (this.arrivalFlight) {
                this.updateFlightSeatReservations(this.flightSeatReservationsArrival[index], updatedCount);
                updatedCount += 1;
            }
        }
    }

    updateFlightSeatReservations(flightSeatReservation, updatedCount) {
        this.flightSeatReservationService.update(flightSeatReservation).subscribe(
            (res: HttpResponse<IReservation>) => {
                if (!this.arrivalFlight && updatedCount === this.flightSeatReservationsDeparture.length - 1) {
                    this.showNextStepButtons = true;
                    alert('Registration completed. Confirmation email has been sent to passengers');
                } else if (this.arrivalFlight && updatedCount === this.flightSeatReservationsDeparture.length * 2 - 1) {
                    this.showNextStepButtons = true;
                    alert('Registration completed. Confirmation email has been sent to passengers');
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    finishReservationProcess(event) {
        this.finishReservation.emit(event);
    }

    continueToHotelBookingTab(event) {
        this.continueToHotelBooking.emit(event);
    }

    areFormsValid() {
        for (let index in this.flightSeatReservationsDeparture) {
            if (
                !this.flightSeatReservationsDeparture[index].firstName ||
                !this.flightSeatReservationsDeparture[index].lastName ||
                !this.flightSeatReservationsDeparture[index].passportNumber
            ) {
                return false;
            }
            if (!this.arrivalFlight) {
                continue;
            }
            if (
                !this.flightSeatReservationsArrival[index].firstName ||
                !this.flightSeatReservationsArrival[index].lastName ||
                !this.flightSeatReservationsArrival[index].passportNumber
            ) {
                return false;
            }
        }
        return true;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
