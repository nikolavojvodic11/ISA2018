import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IHotelRoomReservation } from 'app/shared/model/hotel-room-reservation.model';
import { HotelRoomReservationService } from './hotel-room-reservation.service';
import { IRoom } from 'app/shared/model/room.model';
import { RoomService } from 'app/entities/room';
import { IReservation } from 'app/shared/model/reservation.model';
import { ReservationService } from 'app/entities/reservation';

@Component({
    selector: 'jhi-hotel-room-reservation-update',
    templateUrl: './hotel-room-reservation-update.component.html'
})
export class HotelRoomReservationUpdateComponent implements OnInit {
    hotelRoomReservation: IHotelRoomReservation;
    isSaving: boolean;

    rooms: IRoom[];

    reservations: IReservation[];
    dateFrom: string;
    dateTo: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected hotelRoomReservationService: HotelRoomReservationService,
        protected roomService: RoomService,
        protected reservationService: ReservationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ hotelRoomReservation }) => {
            this.hotelRoomReservation = hotelRoomReservation;
            this.dateFrom = this.hotelRoomReservation.dateFrom != null ? this.hotelRoomReservation.dateFrom.format(DATE_TIME_FORMAT) : null;
            this.dateTo = this.hotelRoomReservation.dateTo != null ? this.hotelRoomReservation.dateTo.format(DATE_TIME_FORMAT) : null;
        });
        this.roomService.query().subscribe(
            (res: HttpResponse<IRoom[]>) => {
                this.rooms = res.body;
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
        this.hotelRoomReservation.dateFrom = this.dateFrom != null ? moment(this.dateFrom, DATE_TIME_FORMAT) : null;
        this.hotelRoomReservation.dateTo = this.dateTo != null ? moment(this.dateTo, DATE_TIME_FORMAT) : null;
        if (this.hotelRoomReservation.id !== undefined) {
            this.subscribeToSaveResponse(this.hotelRoomReservationService.update(this.hotelRoomReservation));
        } else {
            this.subscribeToSaveResponse(this.hotelRoomReservationService.create(this.hotelRoomReservation));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IHotelRoomReservation>>) {
        result.subscribe(
            (res: HttpResponse<IHotelRoomReservation>) => this.onSaveSuccess(),
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

    trackRoomById(index: number, item: IRoom) {
        return item.id;
    }

    trackReservationById(index: number, item: IReservation) {
        return item.id;
    }
}
