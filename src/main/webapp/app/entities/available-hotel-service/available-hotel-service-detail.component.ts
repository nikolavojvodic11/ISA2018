import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAvailableHotelService } from 'app/shared/model/available-hotel-service.model';

@Component({
    selector: 'jhi-available-hotel-service-detail',
    templateUrl: './available-hotel-service-detail.component.html'
})
export class AvailableHotelServiceDetailComponent implements OnInit {
    availableHotelService: IAvailableHotelService;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ availableHotelService }) => {
            this.availableHotelService = availableHotelService;
        });
    }

    previousState() {
        window.history.back();
    }
}
