import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ICompanyLocation } from 'app/shared/model/company-location.model';
import { CarService } from '../car';
import { JhiAlertService } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ICar } from 'app/shared/model/car.model';
import { CompanyLocationService } from './company-location.service';
import { CarReservationService } from '../car-reservation';
import { CarReservation, ICarReservation } from '../../shared/model/car-reservation.model';
import { IReservation } from '../../shared/model/reservation.model';
import { HotelRoomReservation, IHotelRoomReservation, ReservationStatus } from '../../shared/model/hotel-room-reservation.model';
import moment = require('moment');

@Component({
    selector: 'jhi-company-location-detail',
    templateUrl: './company-location-detail.component.html'
})
export class CompanyLocationDetailComponent implements OnInit {
    companyLocation: ICompanyLocation;
    cars: ICar[];
    companyLocations: ICompanyLocation[];
    carReservations: ICarReservation[];
    reservation: IReservation;
    checkboxes: boolean[] = [];
    carSearchFormData: object;

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected carService: CarService,
        protected companyLocationService: CompanyLocationService,
        protected carReservationService: CarReservationService,
        protected router: Router,
        protected jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ companyLocation }) => {
            this.companyLocation = companyLocation;

            if (localStorage.getItem('reservation')) {
                this.reservation = JSON.parse(localStorage.getItem('reservation'));
                this.carSearchFormData = JSON.parse(localStorage.getItem('carSearchFormData'));
            }
            this.getCompanyLocationCars();
            this.getCarReservations();
        });
        this.getAllCompanyLocations();
    }

    getCompanyLocationCars() {
        this.carService.query({ companyLocationId: this.companyLocation.id }).subscribe(
            (res: HttpResponse<ICar[]>) => {
                this.cars = res.body;
                this.createCheckboxModel();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    getCarReservations() {
        this.carReservationService.findByCompanyLocationAndReserved(this.companyLocation.id, this.carSearchFormData).subscribe(
            (res: HttpResponse<ICarReservation[]>) => {
                this.carReservations = res.body;
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

    saveCarReservations() {
        for (let index in this.cars) {
            if (!this.checkboxes[index]) {
                continue;
            }

            let carReservation = new CarReservation();
            carReservation.carReservation = <IReservation>this.reservation;
            // @ts-ignore
            carReservation.status = ReservationStatus.RESERVED;
            carReservation.price = this.cars[index].price;
            carReservation.deleted = false;
            carReservation.dateFrom = moment(this.carSearchFormData['checkInDate'], 'YYYY-MM-DD');
            carReservation.dateTo = moment(this.carSearchFormData['checkOutDate'], 'YYYY-MM-DD');
            carReservation.discount = 0;
            carReservation.car = this.cars[index];

            this.saveCarReservation(carReservation);
        }
    }

    saveCarReservation(carReservation) {
        this.carReservationService.create(carReservation).subscribe(
            (res: HttpResponse<ICarReservation>) => {
                console.warn('CREATE RESERVATION SUCCESS');
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    finishReservationProcess(event) {
        this.saveCarReservations();
        this.router.navigate(['/'], { queryParams: { activeTab: 'my-reservations-tab' } });
    }

    isCarReserved(carId) {
        for (let reservation of this.carReservations) {
            if (reservation.car.id === carId) {
                return true;
            }
        }
        return false;
    }

    areEnoughCarsReserved() {
        if (this.getSeatsReservedCount() >= this.carSearchFormData['adultsCount']) {
            return true;
        }
        return false;
    }

    getSeatsReservedCount() {
        let totalSeats = 0;
        for (let index in this.cars) {
            if (this.checkboxes[index]) {
                totalSeats += this.cars[index].seats;
            }
        }
        return totalSeats;
    }

    createCheckboxModel() {
        for (let car of this.cars) {
            this.checkboxes.push(false);
        }
    }

    checkedCount() {
        let checkedCount = 0;
        for (let cb of this.checkboxes) {
            if (cb) {
                checkedCount++;
            }
        }
        return checkedCount;
    }

    isChecked(index) {
        return this.checkboxes[index];
    }

    isReservationUncomplete() {
        if (localStorage.getItem('reservation')) {
            return true;
        }
        return false;
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
