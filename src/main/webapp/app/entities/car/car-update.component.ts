import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICar } from 'app/shared/model/car.model';
import { CarService } from './car.service';
import { ICompanyLocation } from 'app/shared/model/company-location.model';
import { CompanyLocationService } from 'app/entities/company-location';

@Component({
    selector: 'jhi-car-update',
    templateUrl: './car-update.component.html'
})
export class CarUpdateComponent implements OnInit {
    car: ICar;
    isSaving: boolean;

    companylocations: ICompanyLocation[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected carService: CarService,
        protected companyLocationService: CompanyLocationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ car }) => {
            this.car = car;
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
        if (this.car.id !== undefined) {
            this.subscribeToSaveResponse(this.carService.update(this.car));
        } else {
            this.subscribeToSaveResponse(this.carService.create(this.car));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICar>>) {
        result.subscribe((res: HttpResponse<ICar>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
