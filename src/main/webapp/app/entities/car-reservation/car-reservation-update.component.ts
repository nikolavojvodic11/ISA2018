import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ICarReservation } from 'app/shared/model/car-reservation.model';
import { CarReservationService } from './car-reservation.service';
import { ICar } from 'app/shared/model/car.model';
import { CarService } from 'app/entities/car';
import { IReservation } from 'app/shared/model/reservation.model';
import { ReservationService } from 'app/entities/reservation';

@Component({
    selector: 'jhi-car-reservation-update',
    templateUrl: './car-reservation-update.component.html'
})
export class CarReservationUpdateComponent implements OnInit {
    carReservation: ICarReservation;
    isSaving: boolean;

    cars: ICar[];

    reservations: IReservation[];
    dateFrom: string;
    dateTo: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected carReservationService: CarReservationService,
        protected carService: CarService,
        protected reservationService: ReservationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ carReservation }) => {
            this.carReservation = carReservation;
            this.dateFrom = this.carReservation.dateFrom != null ? this.carReservation.dateFrom.format(DATE_TIME_FORMAT) : null;
            this.dateTo = this.carReservation.dateTo != null ? this.carReservation.dateTo.format(DATE_TIME_FORMAT) : null;
        });
        this.carService.query().subscribe(
            (res: HttpResponse<ICar[]>) => {
                this.cars = res.body;
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
        this.carReservation.dateFrom = this.dateFrom != null ? moment(this.dateFrom, DATE_TIME_FORMAT) : null;
        this.carReservation.dateTo = this.dateTo != null ? moment(this.dateTo, DATE_TIME_FORMAT) : null;
        if (this.carReservation.id !== undefined) {
            this.subscribeToSaveResponse(this.carReservationService.update(this.carReservation));
        } else {
            this.subscribeToSaveResponse(this.carReservationService.create(this.carReservation));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICarReservation>>) {
        result.subscribe((res: HttpResponse<ICarReservation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCarById(index: number, item: ICar) {
        return item.id;
    }

    trackReservationById(index: number, item: IReservation) {
        return item.id;
    }
}
