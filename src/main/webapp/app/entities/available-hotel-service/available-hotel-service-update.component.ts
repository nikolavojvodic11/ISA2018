import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAvailableHotelService } from 'app/shared/model/available-hotel-service.model';
import { AvailableHotelServiceService } from './available-hotel-service.service';
import { IHotelService } from 'app/shared/model/hotel-service.model';
import { HotelServiceService } from 'app/entities/hotel-service';
import { IHotel } from 'app/shared/model/hotel.model';
import { HotelService } from 'app/entities/hotel';

@Component({
    selector: 'jhi-available-hotel-service-update',
    templateUrl: './available-hotel-service-update.component.html'
})
export class AvailableHotelServiceUpdateComponent implements OnInit {
    availableHotelService: IAvailableHotelService;
    isSaving: boolean;

    hotelservices: IHotelService[];

    hotels: IHotel[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected availableHotelServiceService: AvailableHotelServiceService,
        protected hotelServiceService: HotelServiceService,
        protected hotelService: HotelService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ availableHotelService }) => {
            this.availableHotelService = availableHotelService;
        });
        this.hotelServiceService.query().subscribe(
            (res: HttpResponse<IHotelService[]>) => {
                this.hotelservices = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.hotelService.query().subscribe(
            (res: HttpResponse<IHotel[]>) => {
                this.hotels = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.availableHotelService.id !== undefined) {
            this.subscribeToSaveResponse(this.availableHotelServiceService.update(this.availableHotelService));
        } else {
            this.subscribeToSaveResponse(this.availableHotelServiceService.create(this.availableHotelService));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAvailableHotelService>>) {
        result.subscribe(
            (res: HttpResponse<IAvailableHotelService>) => this.onSaveSuccess(),
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

    trackHotelServiceById(index: number, item: IHotelService) {
        return item.id;
    }

    trackHotelById(index: number, item: IHotel) {
        return item.id;
    }
}
