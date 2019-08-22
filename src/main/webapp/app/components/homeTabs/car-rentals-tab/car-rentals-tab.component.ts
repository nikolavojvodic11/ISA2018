import { Component, OnInit } from '@angular/core';
import { ICompanyLocation } from '../../../shared/model/company-location.model';
import { CompanyLocationService } from '../../../entities/company-location';
import { JhiAlertService } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-car-rentals-tab',
    templateUrl: './car-rentals-tab.component.html',
    styles: []
})
export class CarRentalsTabComponent implements OnInit {
    formData: Object;
    companyLocations: ICompanyLocation[];

    constructor(protected companyLocationService: CompanyLocationService, protected jhiAlertService: JhiAlertService) {}

    ngOnInit() {
        this.getCompanyLocations();
    }

    getCompanyLocations() {
        this.companyLocationService.query().subscribe(
            (res: HttpResponse<ICompanyLocation[]>) => {
                this.companyLocations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
