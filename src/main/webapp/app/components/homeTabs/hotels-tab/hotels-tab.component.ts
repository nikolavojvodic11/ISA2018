import { Component, OnInit } from '@angular/core';
import { IHotel } from 'app/shared/model/hotel.model';
import { HotelService } from 'app/entities/hotel/hotel.service';
import { JhiAlertService } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IReservation, Reservation } from '../../../shared/model/reservation.model';
import { IFlight } from '../../../shared/model/flight.model';
import { IFlightSeatReservation } from '../../../shared/model/flight-seat-reservation.model';
import { CityService } from '../../../entities/city';
import { ICity } from '../../../shared/model/city.model';

@Component({
    selector: 'jhi-hotels-tab',
    templateUrl: './hotels-tab.component.html',
    styles: []
})
export class HotelsTabComponent implements OnInit {
    reservation: IReservation;
    flightSeatReservations: IFlightSeatReservation[];
    flightSearchFormData: object;
    searchFormData: Object;
    hotels: IHotel[];
    cities: ICity[];

    constructor(protected hotelService: HotelService, protected cityService: CityService, protected jhiAlertService: JhiAlertService) {
        this.searchFormData = {
            adultsCount: 1,
            checkInDate: '2019-08-19', //new Date().toISOString(),
            checkOutDate: '2019-08-26', //new Date().toISOString(),
            city: 1 //null,
        };
        this.getHotels();
        this.getCities();
    }

    ngOnInit() {
        if (localStorage.getItem('reservation')) {
            this.reservation = JSON.parse(localStorage.getItem('reservation'));
            this.flightSeatReservations = JSON.parse(localStorage.getItem('flightSeatReservations'));
            this.flightSearchFormData = JSON.parse(localStorage.getItem('flightSearchFormData'));

            this.searchFormData = {
                adultsCount: this.flightSearchFormData['adultsCount'],
                checkInDate: this.flightSearchFormData['departureDate'], //new Date().toISOString(),
                checkOutDate: this.flightSearchFormData['arrivalDate'], //new Date().toISOString(),
                city: this.flightSeatReservations[0].flight.arrivalAirport.city.id
            };

            console.log(this.searchFormData);
        }
    }

    getHotels() {
        this.hotelService.query().subscribe(
            (res: HttpResponse<IHotel[]>) => {
                this.hotels = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search() {
        if (localStorage.getItem('reservation')) {
            localStorage.setItem('hotelSearchFormData', JSON.stringify(this.searchFormData));
        }

        // this.searchFormData['checkInDate'] = new Date(this.searchFormData['checkInDate']);
        // this.searchFormData['checkOutDate'] = new Date(this.searchFormData['checkOutDate']);

        this.hotelService.query(this.searchFormData).subscribe(
            (res: HttpResponse<IHotel[]>) => {
                this.hotels = res.body;
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

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
