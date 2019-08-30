import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReservationService } from '../../../entities/reservation';
import { JhiAlertService } from 'ng-jhipster';
import { IFlight } from '../../../shared/model/flight.model';
import { IReservation } from '../../../shared/model/reservation.model';
import { FlightSeatReservationService } from '../../../entities/flight-seat-reservation';
import { FlightSeatReservation, IFlightSeatReservation, ReservationStatus } from '../../../shared/model/flight-seat-reservation.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-flights-tab-seats',
    templateUrl: './flights-tab-seats.component.html',
    styleUrls: ['./flights-tab.css']
})
export class FlightsTabSeatsComponent implements OnInit {
    @Input() searchFormData: object;
    @Input() departureFlight: IFlight;
    @Input() arrivalFlight: IFlight;
    @Input() reservation: IReservation;
    @Output() setFlightSeatReservations: EventEmitter<IFlightSeatReservation[]> = new EventEmitter<IFlightSeatReservation[]>();
    @Output() nextStep: EventEmitter<boolean> = new EventEmitter<boolean>();
    flightSeatReservationsDeparture: IFlightSeatReservation[];
    flightSeatReservationsArrival: IFlightSeatReservation[];

    flightSeatReservationsDepartureCurrent: IFlightSeatReservation[] = [];
    flightSeatReservationsArrivalCurrent: IFlightSeatReservation[] = [];

    cols: Array<string>;
    rows: Array<number>;
    businessCols: Array<string>;
    businessRows: Array<number>;

    colsArrival: Array<string>;
    rowsArrival: Array<number>;
    businessColsArrival: Array<string>;
    businessRowsArrival: Array<number>;

    constructor(protected jhiAlertService: JhiAlertService, protected flightSeatReservationService: FlightSeatReservationService) {}

    ngOnInit() {
        this.getReservedSeats();
        this.cols = this.createColsArray(this.departureFlight.plane.colsCount);
        this.rows = this.createRowsArray(this.departureFlight.plane.rowsCount);
        this.businessCols = this.createColsArray(this.departureFlight.plane.businessColsCount);
        this.businessRows = this.createRowsArray(this.departureFlight.plane.businessRowsCount);
        if (!this.arrivalFlight) {
            return;
        }
        this.colsArrival = this.createColsArray(this.arrivalFlight.plane.colsCount);
        this.rowsArrival = this.createRowsArray(this.arrivalFlight.plane.rowsCount);
        this.businessColsArrival = this.createColsArray(this.arrivalFlight.plane.businessColsCount);
        this.businessRowsArrival = this.createRowsArray(this.arrivalFlight.plane.businessRowsCount);
    }

    getReservedSeats() {
        this.flightSeatReservationService.findByFlightId(this.departureFlight.id).subscribe(
            (res: HttpResponse<IFlightSeatReservation[]>) => {
                this.flightSeatReservationsDeparture = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        if (!this.arrivalFlight) {
            return;
        }
        this.flightSeatReservationService.findByFlightId(this.arrivalFlight.id).subscribe(
            (res: HttpResponse<IFlightSeatReservation[]>) => {
                this.flightSeatReservationsArrival = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    createFlightSeatReservation(flight, flightClass, row, col) {
        const flightSeatReservation = new FlightSeatReservation();
        flightSeatReservation.flight = flight === 'departure' ? this.departureFlight : this.arrivalFlight;
        flightSeatReservation.business = flightClass === 'business';
        flightSeatReservation.deleted = false;
        flightSeatReservation.flightNumber = 1;
        flightSeatReservation.price = flightSeatReservation.business
            ? flightSeatReservation.flight.businessPrice
            : flightSeatReservation.flight.price;
        flightSeatReservation.status = ReservationStatus.RESERVED;
        flightSeatReservation.seatCol = col;
        flightSeatReservation.seatRow = row;
        flightSeatReservation.reservation = this.reservation;
        flightSeatReservation.reservation.carReservations = null;

        // flightSeatReservation.firstName = "";
        // flightSeatReservation.lastName = "";
        // flightSeatReservation.

        this.flightSeatReservationService.create(flightSeatReservation).subscribe(
            (res: HttpResponse<IReservation>) => {
                if (flight === 'departure') {
                    this.flightSeatReservationsDepartureCurrent.push(res.body);
                } else {
                    this.flightSeatReservationsArrivalCurrent.push(res.body);
                }
                this.getReservedSeats();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    isSeatTaken(flight, flightClass, row, col) {
        if (flight === 'departure' && flightClass === 'business') {
            return this.findSeatByRowCol(this.flightSeatReservationsDeparture, flightClass, row, col);
        } else if (flight === 'departure' && flightClass === 'economy') {
            return this.findSeatByRowCol(this.flightSeatReservationsDeparture, flightClass, row, col);
        } else if (flight === 'arrival' && flightClass === 'business') {
            return this.findSeatByRowCol(this.flightSeatReservationsArrival, flightClass, row, col);
        } else if (flight === 'arrival' && flightClass === 'economy') {
            return this.findSeatByRowCol(this.flightSeatReservationsArrival, flightClass, row, col);
        }
        return false;
    }

    isCurrentReservationSeat(flight, flightClass, row, col) {
        if (flight === 'departure' && flightClass === 'business') {
            return this.findSeatByRowCol(this.flightSeatReservationsDepartureCurrent, flightClass, row, col);
        } else if (flight === 'departure' && flightClass === 'economy') {
            return this.findSeatByRowCol(this.flightSeatReservationsDepartureCurrent, flightClass, row, col);
        } else if (flight === 'arrival' && flightClass === 'business') {
            return this.findSeatByRowCol(this.flightSeatReservationsArrivalCurrent, flightClass, row, col);
        } else if (flight === 'arrival' && flightClass === 'economy') {
            return this.findSeatByRowCol(this.flightSeatReservationsArrivalCurrent, flightClass, row, col);
        }
        return false;
    }

    findSeatByRowCol(reservations, flightClass, row, col) {
        for (let res of reservations) {
            if ((flightClass === 'business' && !res.business) || (flightClass === 'economy' && res.business)) {
                continue;
            }
            if (res.seatCol === col && res.seatRow === row) {
                return true;
            }
        }
        return false;
    }

    createColsArray(colsCount) {
        const cols = new Array<string>();
        for (let i = 65; i < 65 + colsCount; i++) {
            cols.push(String.fromCharCode(i));
        }
        return cols;
    }

    createRowsArray(rowsCount) {
        const rows = new Array<number>();
        for (let i = 1; i < rowsCount; i++) {
            rows.push(i);
        }
        return rows;
    }

    onSeatClick(flight, flightClass, row, col) {
        if (
            (flight == 'departure' && this.flightSeatReservationsDepartureCurrent.length == this.searchFormData['adultsCount']) ||
            (flight == 'arrival' && this.flightSeatReservationsArrivalCurrent.length == this.searchFormData['adultsCount'])
        ) {
            return;
        }
        if (this.isSeatTaken(flight, flightClass, row, col)) {
            return;
        }
        if (!confirm('Are you sure you want to reserve this seat?')) {
            return;
        }
        this.createFlightSeatReservation(flight, flightClass, row, col);
    }

    proceed(event) {
        this.setFlightSeatReservations.emit(this.flightSeatReservationsDepartureCurrent);
        if (!this.arrivalFlight) {
            this.nextStep.emit(true);
            return;
        }
        this.setFlightSeatReservations.emit(this.flightSeatReservationsArrivalCurrent);
        this.nextStep.emit(true);
    }

    back(event) {
        alert('back');
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
