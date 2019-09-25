import { Component, OnInit } from '@angular/core';
import { JhiAlertService } from 'ng-jhipster';
import { IReservation } from '../../../shared/model/reservation.model';
import { ReservationService } from '../../../entities/reservation';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FlightSeatReservationService } from '../../../entities/flight-seat-reservation';
import { CarReservationService } from '../../../entities/car-reservation';
import { HotelRoomReservationService } from '../../../entities/hotel-room-reservation';
import { IFlightSeatReservation } from '../../../shared/model/flight-seat-reservation.model';
import { IHotelRoomReservation } from '../../../shared/model/hotel-room-reservation.model';
import { ICarReservation, ReservationStatus } from '../../../shared/model/car-reservation.model';
import { AccountService, IUser } from '../../../core';

@Component({
    selector: 'jhi-my-reservations-tab',
    templateUrl: './my-reservations-tab.component.html',
    styles: []
})
export class MyReservationsTabComponent implements OnInit {
    user: object;
    reservations: object[] = [];
    pendingReservations: object[] = [];
    confirmedReservations: object[] = [];
    carReservations: ICarReservation[] = [];
    hotelReservations: IHotelRoomReservation[] = [];
    flightReservations: IFlightSeatReservation[] = [];
    dataLoaded: boolean = false;

    constructor(
        protected reservationService: ReservationService,
        protected flightSeatReservationService: FlightSeatReservationService,
        protected hotelRoomReservationService: HotelRoomReservationService,
        protected carReservationService: CarReservationService,
        protected accountService: AccountService,
        protected jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.dataLoaded = false;
        this.accountService.identity().then(account => {
            this.user = account;
            this.getReservations();
        });
    }

    // getConfirmedReservations() {
    //     this.reservationService.query().subscribe(
    //         (res: HttpResponse<IReservation[]>) => {
    //             this.reservations = res.body;
    //         },
    //         (res: HttpErrorResponse) => this.onError(res.message)
    //     );
    // }

    getReservations() {
        this.getUserFlightReservations();
    }

    getUserCarReservations() {
        this.carReservationService.query().subscribe(
            (res: HttpResponse<ICarReservation[]>) => {
                this.carReservations = res.body;

                this.groupReservations();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    getUserHotelReservations() {
        this.hotelRoomReservationService.query().subscribe(
            (res: HttpResponse<IHotelRoomReservation[]>) => {
                this.hotelReservations = res.body;
                this.getUserCarReservations();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    getUserFlightReservations() {
        this.flightSeatReservationService.query().subscribe(
            (res: HttpResponse<IFlightSeatReservation[]>) => {
                this.flightReservations = res.body;
                this.getUserHotelReservations();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    rateFlight(flightSeatReservation) {
        let fReservation = { ...flightSeatReservation };
        delete fReservation.reservation.flightReservations;
        delete fReservation.reservation.hotelServiceReservations;
        delete fReservation.reservation.hotelRoomReservations;
        delete fReservation.reservation.carReservations;

        this.flightSeatReservationService.update(fReservation).subscribe(
            (res: HttpResponse<IFlightSeatReservation>) => {
                this.getReservations();
                alert('Your rating has been sent');
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    rateHotel(hotelSeatReservation) {
        this.hotelRoomReservationService.update(hotelSeatReservation).subscribe(
            (res: HttpResponse<IHotelRoomReservation>) => {
                this.getReservations();
                alert('Your rating has been sent');
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    rateCarRental(carReservation) {
        this.carReservationService.update(carReservation).subscribe(
            (res: HttpResponse<ICarReservation>) => {
                this.getReservations();
                alert('Your rating has been sent');
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    confirmFlightReservation(flightSeatReservation) {
        let fReservation = { ...flightSeatReservation };
        delete fReservation.reservation.flightReservations;
        delete fReservation.reservation.hotelServiceReservations;
        delete fReservation.reservation.hotelRoomReservations;
        delete fReservation.reservation.carReservations;

        fReservation.status = ReservationStatus.CONFIRMED;

        this.flightSeatReservationService.update(fReservation).subscribe(
            (res: HttpResponse<IFlightSeatReservation>) => {
                this.getReservations();
                alert('Your reservation is confirmed');
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    confirmHotelReservation(hotelRoomReservation) {
        let hReservation = { ...hotelRoomReservation };
        delete hReservation.reservation.flightReservations;
        delete hReservation.reservation.hotelServiceReservations;
        delete hReservation.reservation.hotelRoomReservations;
        delete hReservation.reservation.carReservations;

        hReservation.status = ReservationStatus.CONFIRMED;

        this.hotelRoomReservationService.update(hReservation).subscribe(
            (res: HttpResponse<IHotelRoomReservation>) => {
                this.getReservations();
                alert('Your reservation is confirmed');
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    confirmCarReservation(carRes) {
        let cReservation = { ...carRes };
        delete cReservation.carReservation.flightReservations;
        delete cReservation.carReservation.hotelServiceReservations;
        delete cReservation.carReservation.hotelRoomReservations;
        delete cReservation.carReservation.carReservations;

        cReservation.status = ReservationStatus.CONFIRMED;

        this.carReservationService.update(cReservation).subscribe(
            (res: HttpResponse<ICarReservation>) => {
                this.getReservations();
                alert('Your reservation is confirmed');
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    groupReservations() {
        this.reservations = [];
        for (let flightRes of this.flightReservations) {
            let reservationIndex = this.getReservationIndex(flightRes.reservation.id);
            if (reservationIndex !== -1) {
                if (this.reservations[reservationIndex]['flightReservations']) {
                    this.reservations[reservationIndex]['flightReservations'].push(flightRes);
                } else {
                    this.reservations[reservationIndex]['flightReservations'] = [flightRes];
                }
            } else {
                this.reservations.push(flightRes.reservation);
                this.reservations[this.reservations.length - 1]['flightReservations'] = [flightRes];
            }
        }

        for (let hotelRes of this.hotelReservations) {
            let reservationIndex = this.getReservationIndex(hotelRes.reservation.id);
            if (reservationIndex !== -1) {
                if (this.reservations[reservationIndex]['hotelReservations']) {
                    this.reservations[reservationIndex]['hotelReservations'].push(hotelRes);
                } else {
                    this.reservations[reservationIndex]['hotelReservations'] = [hotelRes];
                }
            } else {
                this.reservations.push(hotelRes.reservation);
                this.reservations[this.reservations.length - 1]['hotelReservations'] = [hotelRes];
            }
        }

        for (let carRes of this.carReservations) {
            let reservationIndex = this.getReservationIndex(carRes.carReservation.id);
            if (reservationIndex !== -1) {
                if (this.reservations[reservationIndex]['carReservations']) {
                    this.reservations[reservationIndex]['carReservations'].push(carRes);
                } else {
                    this.reservations[reservationIndex]['carReservations'] = [carRes];
                }
            } else {
                this.reservations.push(carRes.carReservation);
                this.reservations[this.reservations.length - 1]['carReservations'] = [carRes];
            }
        }
        this.splitReservationsByStatus();
    }

    splitReservationsByStatus() {
        this.pendingReservations = [];
        this.confirmedReservations = [];
        for (let res of this.reservations) {
            if (!res['flightReservations'] && !res['hotelReservations'] && !res['carReservations']) {
                continue;
            }

            if (this.notAUserReservation(res['flightReservations'])) {
                continue;
            }

            let confirmed = true;

            if (res['flightReservations']) {
                for (let flightRes of res['flightReservations']) {
                    if (flightRes.status === ReservationStatus.RESERVED) {
                        confirmed = false;
                    }
                }
            }

            if (res['hotelReservations']) {
                for (let hotelRes of res['hotelReservations']) {
                    if (hotelRes.status === ReservationStatus.RESERVED) {
                        confirmed = false;
                    }
                }
            }

            if (res['carReservations']) {
                for (let carRes of res['carReservations']) {
                    if (carRes.status === ReservationStatus.RESERVED) {
                        confirmed = false;
                    }
                }
            }

            if (confirmed) {
                this.confirmedReservations.push(res);
            } else {
                this.pendingReservations.push(res);
            }
        }
        this.dataLoaded = true;
    }

    notAUserReservation(flightSeatReservations) {
        for (let res of flightSeatReservations) {
            if (!res.user) {
                continue;
            }
            if (res.user.jhiUser.id === this.user['id']) {
                return false;
            }
        }
        return true;
    }

    getReservationIndex(reservationId) {
        for (let index in this.reservations) {
            if (this.reservations[index]['id'] === reservationId) {
                return index;
            }
        }
        return -1;
    }

    isReservationPending() {
        if (localStorage.getItem('reservation')) {
            return true;
        }
        return false;
    }

    getCurrentDate() {
        return new Date();
    }

    getDateFromString(date: string) {
        return new Date(date);
    }

    copyAccount(account) {
        return {
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl
        };
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
