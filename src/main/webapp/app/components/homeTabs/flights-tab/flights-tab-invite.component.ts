import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { IFlight } from '../../../shared/model/flight.model';
import { IReservation } from '../../../shared/model/reservation.model';
import { FlightSeatReservation, IFlightSeatReservation, ReservationStatus } from '../../../shared/model/flight-seat-reservation.model';
import { IFriendRequest } from '../../../shared/model/friend-request.model';
import { FriendRequestService } from '../../../entities/friend-request';
import { JhiAlertService } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FlightSeatReservationService } from '../../../entities/flight-seat-reservation';

@Component({
    selector: 'jhi-flights-tab-invite',
    templateUrl: './flights-tab-invite.component.html',
    styles: []
})
export class FlightsTabInviteComponent implements OnInit {
    @Input() searchFormData: object;
    @Input() departureFlight: IFlight;
    @Input() arrivalFlight: IFlight;
    @Input() reservation: IReservation;
    @Input() flightSeatReservationsDeparture: IFlightSeatReservation[];
    @Input() flightSeatReservationsArrival: IFlightSeatReservation[];
    @Output() setFlightSeatReservations: EventEmitter<IFlightSeatReservation[]> = new EventEmitter<IFlightSeatReservation[]>();
    @Output() nextStep: EventEmitter<boolean> = new EventEmitter<boolean>();
    friendRequests: IFriendRequest[];
    checkboxes: boolean[] = [];
    updatedReservationsDepartureCount: number = 0;
    updatedReservationsArrivalCount: number = 0;

    constructor(
        protected flightSeatReservationService: FlightSeatReservationService,
        protected friendRequestService: FriendRequestService,
        protected jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.getUserFriends();
    }

    createCheckboxModel() {
        for (let fr of this.friendRequests) {
            this.checkboxes.push(false);
        }
    }

    checkedCount() {
        let checkedCount = 0;
        for (let cb of this.checkboxes) {
            if (cb) {
                checkedCount++;
            }
        }
        return checkedCount;
    }

    isChecked(index) {
        return this.checkboxes[index];
    }

    checkboxClick(index) {
        if (this.checkedCount() === this.flightSeatReservationsDeparture.length - 1 && this.checkboxes[index] === false) {
            alert('You cannot invite more people than tickets reserved');
            return;
        }
        this.checkboxes[index] = !this.checkboxes[index];
    }

    getUserFriends() {
        this.friendRequestService.getCurrentUserFriends().subscribe(
            (res: HttpResponse<IFriendRequest[]>) => {
                this.friendRequests = res.body;
                this.createCheckboxModel();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    proceed(event) {
        let flightSeatRservationIndex = 0;

        this.flightSeatReservationsDeparture[0].user = this.reservation.user;
        this.flightSeatReservationsDeparture[0].firstName = this.reservation.user.jhiUser.firstName;
        this.flightSeatReservationsDeparture[0].lastName = this.reservation.user.jhiUser.lastName;
        this.updateFlightSeatReservation(
            this.flightSeatReservationsDeparture[flightSeatRservationIndex],
            flightSeatRservationIndex,
            'departure'
        );
        if (this.flightSeatReservationsArrival) {
            this.flightSeatReservationsArrival[0].user = this.reservation.user;
            this.flightSeatReservationsArrival[0].firstName = this.reservation.user.jhiUser.firstName;
            this.flightSeatReservationsArrival[0].lastName = this.reservation.user.jhiUser.lastName;
            this.updateFlightSeatReservation(
                this.flightSeatReservationsArrival[flightSeatRservationIndex],
                flightSeatRservationIndex,
                'arrival'
            );
        }
        flightSeatRservationIndex += 1;

        for (let index in this.friendRequests) {
            if (this.checkboxes[index]) {
                let user =
                    this.friendRequests[index].reciver.id === this.reservation.user.id
                        ? this.friendRequests[index].sender
                        : this.friendRequests[index].reciver;
                this.flightSeatReservationsDeparture[flightSeatRservationIndex].user = user;
                this.flightSeatReservationsDeparture[flightSeatRservationIndex].firstName = user.jhiUser.firstName;
                this.flightSeatReservationsDeparture[flightSeatRservationIndex].lastName = user.jhiUser.lastName;
                this.updateFlightSeatReservation(
                    this.flightSeatReservationsDeparture[flightSeatRservationIndex],
                    flightSeatRservationIndex,
                    'departure'
                );

                if (this.flightSeatReservationsArrival) {
                    this.flightSeatReservationsArrival[flightSeatRservationIndex].user = user;
                    this.flightSeatReservationsArrival[flightSeatRservationIndex].firstName = user.jhiUser.firstName;
                    this.flightSeatReservationsArrival[flightSeatRservationIndex].lastName = user.jhiUser.lastName;
                    this.updateFlightSeatReservation(
                        this.flightSeatReservationsArrival[flightSeatRservationIndex],
                        flightSeatRservationIndex,
                        'arrival'
                    );
                }

                flightSeatRservationIndex += 1;
            }
        }
    }

    updateFlightSeatReservation(flightSeatReservation, flightSeatReservationIndex, flight) {
        this.flightSeatReservationService.update(flightSeatReservation).subscribe(
            (res: HttpResponse<IFlightSeatReservation>) => {
                if (flight === 'departure') {
                    this.flightSeatReservationsDeparture[flightSeatReservationIndex] = res.body;
                    this.updatedReservationsDepartureCount += 1;
                } else {
                    this.flightSeatReservationsArrival[flightSeatReservationIndex] = res.body;
                    this.updatedReservationsArrivalCount += 1;
                }

                if (this.departureFlight && !this.arrivalFlight && this.updatedReservationsDepartureCount === this.checkedCount() + 1) {
                    this.setFlightSeatReservations.emit(this.flightSeatReservationsDeparture);
                    this.nextStep.emit(true);
                } else if (
                    this.departureFlight &&
                    this.arrivalFlight &&
                    this.updatedReservationsDepartureCount === this.checkedCount() + 1 &&
                    this.updatedReservationsArrivalCount === this.checkedCount() + 1
                ) {
                    this.setFlightSeatReservations.emit(this.flightSeatReservationsArrival);
                    this.nextStep.emit(true);
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
