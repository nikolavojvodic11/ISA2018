import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICompanyLocation } from 'app/shared/model/company-location.model';
import { CompanyLocationService } from './company-location.service';
import { ICity } from 'app/shared/model/city.model';
import { CityService } from 'app/entities/city';
import { ICompany } from 'app/shared/model/company.model';
import { CompanyService } from 'app/entities/company';

@Component({
    selector: 'jhi-company-location-update',
    templateUrl: './company-location-update.component.html'
})
export class CompanyLocationUpdateComponent implements OnInit {
    companyLocation: ICompanyLocation;
    isSaving: boolean;

    cities: ICity[];

    companies: ICompany[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected companyLocationService: CompanyLocationService,
        protected cityService: CityService,
        protected companyService: CompanyService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ companyLocation }) => {
            this.companyLocation = companyLocation;
        });
        this.cityService.query().subscribe(
            (res: HttpResponse<ICity[]>) => {
                this.cities = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.companyService.query().subscribe(
            (res: HttpResponse<ICompany[]>) => {
                this.companies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.companyLocation.id !== undefined) {
            this.subscribeToSaveResponse(this.companyLocationService.update(this.companyLocation));
        } else {
            this.subscribeToSaveResponse(this.companyLocationService.create(this.companyLocation));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompanyLocation>>) {
        result.subscribe((res: HttpResponse<ICompanyLocation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCityById(index: number, item: ICity) {
        return item.id;
    }

    trackCompanyById(index: number, item: ICompany) {
        return item.id;
    }
}
