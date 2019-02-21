import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IHotelServiceReservation } from 'app/shared/model/hotel-service-reservation.model';
import { HotelServiceReservationService } from './hotel-service-reservation.service';
import { IAvailableHotelService } from 'app/shared/model/available-hotel-service.model';
import { AvailableHotelServiceService } from 'app/entities/available-hotel-service';
import { IReservation } from 'app/shared/model/reservation.model';
import { ReservationService } from 'app/entities/reservation';

@Component({
    selector: 'jhi-hotel-service-reservation-update',
    templateUrl: './hotel-service-reservation-update.component.html'
})
export class HotelServiceReservationUpdateComponent implements OnInit {
    hotelServiceReservation: IHotelServiceReservation;
    isSaving: boolean;

    availablehotelservices: IAvailableHotelService[];

    reservations: IReservation[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected hotelServiceReservationService: HotelServiceReservationService,
        protected availableHotelServiceService: AvailableHotelServiceService,
        protected reservationService: ReservationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ hotelServiceReservation }) => {
            this.hotelServiceReservation = hotelServiceReservation;
        });
        this.availableHotelServiceService.query().subscribe(
            (res: HttpResponse<IAvailableHotelService[]>) => {
                this.availablehotelservices = res.body;
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
        if (this.hotelServiceReservation.id !== undefined) {
            this.subscribeToSaveResponse(this.hotelServiceReservationService.update(this.hotelServiceReservation));
        } else {
            this.subscribeToSaveResponse(this.hotelServiceReservationService.create(this.hotelServiceReservation));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IHotelServiceReservation>>) {
        result.subscribe(
            (res: HttpResponse<IHotelServiceReservation>) => this.onSaveSuccess(),
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

    trackAvailableHotelServiceById(index: number, item: IAvailableHotelService) {
        return item.id;
    }

    trackReservationById(index: number, item: IReservation) {
        return item.id;
    }
}
