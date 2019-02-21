import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHotelService } from 'app/shared/model/hotel-service.model';

@Component({
    selector: 'jhi-hotel-service-detail',
    templateUrl: './hotel-service-detail.component.html'
})
export class HotelServiceDetailComponent implements OnInit {
    hotelService: IHotelService;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hotelService }) => {
            this.hotelService = hotelService;
        });
    }

    previousState() {
        window.history.back();
    }
}
