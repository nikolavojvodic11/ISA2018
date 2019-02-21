import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IHotelService } from 'app/shared/model/hotel-service.model';
import { HotelServiceService } from './hotel-service.service';

@Component({
    selector: 'jhi-hotel-service-update',
    templateUrl: './hotel-service-update.component.html'
})
export class HotelServiceUpdateComponent implements OnInit {
    hotelService: IHotelService;
    isSaving: boolean;

    constructor(protected hotelServiceService: HotelServiceService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ hotelService }) => {
            this.hotelService = hotelService;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.hotelService.id !== undefined) {
            this.subscribeToSaveResponse(this.hotelServiceService.update(this.hotelService));
        } else {
            this.subscribeToSaveResponse(this.hotelServiceService.create(this.hotelService));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IHotelService>>) {
        result.subscribe((res: HttpResponse<IHotelService>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
