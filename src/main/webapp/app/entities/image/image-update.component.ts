import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IImage } from 'app/shared/model/image.model';
import { ImageService } from './image.service';
import { ICompany } from 'app/shared/model/company.model';
import { CompanyService } from 'app/entities/company';
import { ICar } from 'app/shared/model/car.model';
import { CarService } from 'app/entities/car';
import { IHotel } from 'app/shared/model/hotel.model';
import { HotelService } from 'app/entities/hotel';
import { IRoom } from 'app/shared/model/room.model';
import { RoomService } from 'app/entities/room';

@Component({
    selector: 'jhi-image-update',
    templateUrl: './image-update.component.html'
})
export class ImageUpdateComponent implements OnInit {
    image: IImage;
    isSaving: boolean;

    companies: ICompany[];

    cars: ICar[];

    hotels: IHotel[];

    rooms: IRoom[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected imageService: ImageService,
        protected companyService: CompanyService,
        protected carService: CarService,
        protected hotelService: HotelService,
        protected roomService: RoomService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ image }) => {
            this.image = image;
        });
        this.companyService.query().subscribe(
            (res: HttpResponse<ICompany[]>) => {
                this.companies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.carService.query().subscribe(
            (res: HttpResponse<ICar[]>) => {
                this.cars = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.hotelService.query().subscribe(
            (res: HttpResponse<IHotel[]>) => {
                this.hotels = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.roomService.query().subscribe(
            (res: HttpResponse<IRoom[]>) => {
                this.rooms = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.image.id !== undefined) {
            this.subscribeToSaveResponse(this.imageService.update(this.image));
        } else {
            this.subscribeToSaveResponse(this.imageService.create(this.image));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IImage>>) {
        result.subscribe((res: HttpResponse<IImage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCompanyById(index: number, item: ICompany) {
        return item.id;
    }

    trackCarById(index: number, item: ICar) {
        return item.id;
    }

    trackHotelById(index: number, item: IHotel) {
        return item.id;
    }

    trackRoomById(index: number, item: IRoom) {
        return item.id;
    }
}
