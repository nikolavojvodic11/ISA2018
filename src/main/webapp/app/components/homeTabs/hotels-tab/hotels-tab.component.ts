import { Component, OnInit } from '@angular/core';
import { IHotel } from 'app/shared/model/hotel.model';
import { HotelService } from 'app/entities/hotel/hotel.service';
import { JhiAlertService } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-hotels-tab',
    templateUrl: './hotels-tab.component.html',
    styles: []
})
export class HotelsTabComponent implements OnInit {
    formData: Object;
    hotels: IHotel[];

    constructor(protected hotelService: HotelService, protected jhiAlertService: JhiAlertService) {
        this.getHotels();
    }

    ngOnInit() {}

    getHotels() {
        this.hotelService.query().subscribe(
            (res: HttpResponse<IHotel[]>) => {
                this.hotels = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
