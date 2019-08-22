import { Component, OnInit } from '@angular/core';
import { AirportService } from '../../../entities/airport';
import { JhiAlertService } from 'ng-jhipster';
import { IAirport } from '../../../shared/model/airport.model';
import { ICity } from '../../../shared/model/city.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ICompany } from '../../../shared/model/company.model';
import { CompanyService } from 'app/entities/company';

@Component({
    selector: 'jhi-flights-tab-search',
    templateUrl: './flights-tab-search.component.html',
    styles: []
})
export class FlightsTabSearchComponent implements OnInit {
    formData: Object;
    airports: IAirport[];
    companies: ICompany[];

    constructor(
        protected airportService: AirportService,
        protected companyService: CompanyService,
        protected jhiAlertService: JhiAlertService
    ) {
        this.formData = {
            adultsCount: null,
            flightType: null,
            flightClass: null,
            departureDate: new Date().toISOString(),
            arrivalDate: new Date().toISOString(),
            departureAirport: null,
            arrivalAirport: null
        };
    }

    ngOnInit() {
        this.getAirports();
        this.getAirlines();
    }

    getAirports() {
        this.airportService.query().subscribe(
            (res: HttpResponse<ICity[]>) => {
                this.airports = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    getAirlines() {
        this.companyService.query().subscribe(
            (res: HttpResponse<ICompany[]>) => {
                this.companies = res.body;
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
}
