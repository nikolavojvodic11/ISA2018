import { Component, OnInit } from '@angular/core';
import { ICompanyLocation } from '../../../shared/model/company-location.model';
import { CompanyLocationService } from '../../../entities/company-location';
import { JhiAlertService } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IReservation } from '../../../shared/model/reservation.model';
import { IFlightSeatReservation } from '../../../shared/model/flight-seat-reservation.model';
import { ICity } from '../../../shared/model/city.model';
import { ICarReservation } from '../../../shared/model/car-reservation.model';
import { CityService } from '../../../entities/city';
import { CompanyType, ICompany } from '../../../shared/model/company.model';
import { CompanyService } from '../../../entities/company';

@Component({
    selector: 'jhi-car-rentals-tab',
    templateUrl: './car-rentals-tab.component.html',
    styles: []
})
export class CarRentalsTabComponent implements OnInit {
    reservation: IReservation;
    carReservations: ICarReservation[];
    flightSeatReservations: IFlightSeatReservation[];
    flightSearchFormData: object;
    searchFormData: Object;
    cities: ICity[];
    companies: ICompany[];
    companyLocations: ICompanyLocation[];

    constructor(
        protected companyLocationService: CompanyLocationService,
        protected cityService: CityService,
        protected companyService: CompanyService,
        protected jhiAlertService: JhiAlertService
    ) {
        this.searchFormData = {
            adultsCount: 1,
            checkInDate: '2019-08-19', //new Date().toISOString(),
            checkOutDate: '2019-08-26', //new Date().toISOString(),
            city: 1, //null,
            companyId: 7
        };
    }

    ngOnInit() {
        this.getCompanyLocations();
        this.getCities();
        this.getCompanies();

        if (localStorage.getItem('reservation')) {
            this.reservation = JSON.parse(localStorage.getItem('reservation'));
            this.flightSeatReservations = JSON.parse(localStorage.getItem('flightSeatReservations'));
            this.flightSearchFormData = JSON.parse(localStorage.getItem('flightSearchFormData'));

            this.searchFormData = {
                adultsCount: this.flightSearchFormData['adultsCount'],
                checkInDate: this.flightSearchFormData['departureDate'], //new Date().toISOString(),
                checkOutDate: this.flightSearchFormData['arrivalDate'], //new Date().toISOString(),
                city: this.flightSeatReservations[0].flight.arrivalAirport.city.id,
                companyId: 7
            };

            console.log(this.searchFormData);
        }
    }

    getCompanyLocations() {
        this.companyLocationService.query().subscribe(
            (res: HttpResponse<ICompanyLocation[]>) => {
                this.companyLocations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    getCities() {
        this.cityService.query().subscribe(
            (res: HttpResponse<ICity[]>) => {
                this.cities = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    getCompanies() {
        this.companyService.query({ type: 'CAR_RENTAL' }).subscribe(
            (res: HttpResponse<ICompany[]>) => {
                this.companies = this.getCarRentalsOnly(res.body);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    getCarRentalsOnly(companies) {
        let result = [];
        for (let company of companies) {
            if (company['type'] === CompanyType.CAR_RENTAL) {
                result.push(company);
            }
        }
        return result;
    }

    search() {
        if (localStorage.getItem('reservation')) {
            localStorage.setItem('carSearchFormData', JSON.stringify(this.searchFormData));
        }
        if (!this.searchFormData['city']) {
            delete this.searchFormData['city'];
        }
        if (!this.searchFormData['companyId']) {
            delete this.searchFormData['companyId'];
        }
        if (!this.searchFormData['adultsCount']) {
            delete this.searchFormData['adultsCount'];
        }

        this.companyLocationService.query(this.searchFormData).subscribe(
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
