import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IHotel } from 'app/shared/model/hotel.model';
import { HotelService } from './hotel.service';
import { ICompanyLocation } from 'app/shared/model/company-location.model';
import { CompanyLocationService } from 'app/entities/company-location';

@Component({
    selector: 'jhi-hotel-update',
    templateUrl: './hotel-update.component.html'
})
export class HotelUpdateComponent implements OnInit {
    hotel: IHotel;
    isSaving: boolean;

    companylocations: ICompanyLocation[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected hotelService: HotelService,
        protected companyLocationService: CompanyLocationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ hotel }) => {
            this.hotel = hotel;
        });
        this.companyLocationService.query().subscribe(
            (res: HttpResponse<ICompanyLocation[]>) => {
                this.companylocations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.hotel.id !== undefined) {
            this.subscribeToSaveResponse(this.hotelService.update(this.hotel));
        } else {
            this.subscribeToSaveResponse(this.hotelService.create(this.hotel));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IHotel>>) {
        result.subscribe((res: HttpResponse<IHotel>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCompanyLocationById(index: number, item: ICompanyLocation) {
        return item.id;
    }
}
