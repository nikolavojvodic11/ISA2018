import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
    @Input() searchFormData: object;
    @Output() searchClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    constructor(
        protected airportService: AirportService,
        protected companyService: CompanyService,
        protected jhiAlertService: JhiAlertService
    ) {
        this.formData = {
            adultsCount: 1,
            flightType: 1,
            flightClass: 1,
            departureDate: '2019-08-19', //new Date().toISOString(),
            arrivalDate: '2019-08-26', //new Date().toISOString(),
            departureAirport: 3, //null,
            arrivalAirport: 1 //null
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

    search(event) {
        event.data = this.formData;
        this.searchClick.emit(event);
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
