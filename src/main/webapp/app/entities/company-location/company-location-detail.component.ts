import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompanyLocation } from 'app/shared/model/company-location.model';
import { CarService } from '../car';
import { JhiAlertService } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ICar } from 'app/shared/model/car.model';
import { CompanyLocationService } from './company-location.service';

@Component({
    selector: 'jhi-company-location-detail',
    templateUrl: './company-location-detail.component.html'
})
export class CompanyLocationDetailComponent implements OnInit {
    companyLocation: ICompanyLocation;
    cars: ICar[];
    companyLocations: ICompanyLocation[];

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected carService: CarService,
        protected companyLocationService: CompanyLocationService,
        protected jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ companyLocation }) => {
            this.companyLocation = companyLocation;
            this.getCompanyLocationCars();
        });
        this.getAllCompanyLocations();
    }

    getCompanyLocationCars() {
        this.carService.query({ companyLocationId: this.companyLocation.id }).subscribe(
            (res: HttpResponse<ICar[]>) => {
                this.cars = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    getAllCompanyLocations() {
        this.companyLocationService.query({ companyId: this.companyLocation.company.id }).subscribe(
            (res: HttpResponse<ICompanyLocation[]>) => {
                this.companyLocations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search() {
        // console.error('Form data', this.formData);
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    previousState() {
        window.history.back();
    }
}
