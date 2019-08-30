import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHotel } from 'app/shared/model/hotel.model';
import { RoomService } from '../room';
import { IAvailableHotelService } from '../../shared/model/available-hotel-service.model';
import { IRoom } from '../../shared/model/room.model';
import { JhiAlertService } from 'ng-jhipster';
import { AvailableHotelServiceService } from '../available-hotel-service';
import { ICar } from '../../shared/model/car.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-hotel-detail',
    templateUrl: './hotel-detail.component.html'
})
export class HotelDetailComponent implements OnInit {
    hotel: IHotel;
    rooms: IRoom[];
    availableHotelServices: IAvailableHotelService[];

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected roomService: RoomService,
        protected availableHotelServiceService: AvailableHotelServiceService,
        protected jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hotel }) => {
            this.hotel = hotel;

            this.getHotelRooms();
            this.getHotelAvailableServices();
        });
    }

    getHotelRooms() {
        this.roomService.findByHotelId(this.hotel.id).subscribe(
            (res: HttpResponse<IRoom[]>) => {
                this.rooms = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    getHotelAvailableServices() {
        this.availableHotelServiceService.findByHotelId(this.hotel.id).subscribe(
            (res: HttpResponse<IAvailableHotelService[]>) => {
                this.availableHotelServices = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    previousState() {
        window.history.back();
    }
}
