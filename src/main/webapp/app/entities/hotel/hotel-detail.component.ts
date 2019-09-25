import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IHotel } from 'app/shared/model/hotel.model';
import { RoomService } from '../room';
import { IAvailableHotelService } from '../../shared/model/available-hotel-service.model';
import { IRoom } from '../../shared/model/room.model';
import { JhiAlertService } from 'ng-jhipster';
import { AvailableHotelServiceService } from '../available-hotel-service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HotelRoomReservation, IHotelRoomReservation, ReservationStatus } from '../../shared/model/hotel-room-reservation.model';
import { HotelRoomReservationService } from '../hotel-room-reservation';
import { IReservation, Reservation } from '../../shared/model/reservation.model';
import moment = require('moment');

@Component({
    selector: 'jhi-hotel-detail',
    templateUrl: './hotel-detail.component.html'
})
export class HotelDetailComponent implements OnInit {
    @Output() setActiveTab: EventEmitter<string> = new EventEmitter<string>();
    hotel: IHotel;
    rooms: IRoom[];
    availableHotelServices: IAvailableHotelService[];
    hotelRoomReservations: IHotelRoomReservation[];
    hotelSearchFormData: object;
    checkboxes: boolean[] = [];
    reservation: IReservation;

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected roomService: RoomService,
        protected hotelRoomReservationService: HotelRoomReservationService,
        protected availableHotelServiceService: AvailableHotelServiceService,
        protected router: Router,
        protected jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hotel }) => {
            this.hotel = hotel;

            if (localStorage.getItem('reservation')) {
                this.reservation = JSON.parse(localStorage.getItem('reservation'));
                this.hotelSearchFormData = JSON.parse(localStorage.getItem('hotelSearchFormData'));
            }

            this.getHotelRooms();
            this.getHotelRoomReservations();
            this.getHotelAvailableServices();
        });
    }

    getHotelRooms() {
        this.roomService.findByHotelId(this.hotel.id).subscribe(
            (res: HttpResponse<IRoom[]>) => {
                this.rooms = res.body;
                // this.createCheckboxModel();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    getHotelRoomReservations() {
        this.hotelRoomReservationService.findByHotelIdAndReserved(this.hotel.id, this.hotelSearchFormData).subscribe(
            (res: HttpResponse<IHotelRoomReservation[]>) => {
                this.hotelRoomReservations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    getHotelAvailableServices() {
        this.availableHotelServiceService.findByHotelId(this.hotel.id).subscribe(
            (res: HttpResponse<IAvailableHotelService[]>) => {
                this.availableHotelServices = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    saveRoomReservations() {
        for (let index in this.rooms) {
            if (!this.checkboxes[index]) {
                continue;
            }

            let hotelRoomReservation = new HotelRoomReservation();
            hotelRoomReservation.reservation = <IReservation>this.reservation;
            delete hotelRoomReservation.reservation.hotelRoomReservations;
            delete hotelRoomReservation.reservation.hotelServiceReservations;
            delete hotelRoomReservation.reservation.carReservations;
            delete hotelRoomReservation.reservation.flightSeatReservations;
            hotelRoomReservation.status = ReservationStatus.RESERVED;
            hotelRoomReservation.price = 0;
            hotelRoomReservation.deleted = false;
            hotelRoomReservation.dateFrom = moment(this.hotelSearchFormData['checkInDate'], 'YYYY-MM-DD');
            hotelRoomReservation.dateTo = moment(this.hotelSearchFormData['checkOutDate'], 'YYYY-MM-DD');
            hotelRoomReservation.discount = 0;
            hotelRoomReservation.room = this.rooms[index];

            console.error(hotelRoomReservation);

            this.saveRoomReservation(hotelRoomReservation);
        }
    }

    saveRoomReservation(hotelRoomReservation) {
        this.hotelRoomReservationService.create(hotelRoomReservation).subscribe(
            (res: HttpResponse<IHotelRoomReservation>) => {
                console.warn('CREATE RESERVATION SUCCESS');
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    continueToCarRentalTab(event) {
        this.saveRoomReservations();
        this.router.navigate(['/'], { queryParams: { activeTab: 'cars-tab' } });
    }

    finishReservationProcess(event) {
        this.saveRoomReservations();
        this.router.navigate(['/'], { queryParams: { activeTab: 'my-reservations-tab' } });
    }

    isRoomReserved(roomId) {
        for (let reservation of this.hotelRoomReservations) {
            if (reservation.room.id === roomId) {
                return true;
            }
        }
        return false;
    }

    areEnoughBedsReserved() {
        if (this.getBedsReservedCount() >= this.hotelSearchFormData['adultsCount']) {
            return true;
        }
        return false;
    }

    getBedsReservedCount() {
        let totalBeds = 0;
        for (let index in this.rooms) {
            if (this.checkboxes[index]) {
                totalBeds += this.rooms[index].bedsCount;
            }
        }
        return totalBeds;
    }

    createCheckboxModel() {
        for (let room of this.rooms) {
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

    isReservationUncomplete() {
        if (localStorage.getItem('reservation')) {
            return true;
        }
        return false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    previousState() {
        window.history.back();
    }
}
