import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IRoomPricelist } from 'app/shared/model/room-pricelist.model';
import { RoomPricelistService } from './room-pricelist.service';
import { IRoom } from 'app/shared/model/room.model';
import { RoomService } from 'app/entities/room';

@Component({
    selector: 'jhi-room-pricelist-update',
    templateUrl: './room-pricelist-update.component.html'
})
export class RoomPricelistUpdateComponent implements OnInit {
    roomPricelist: IRoomPricelist;
    isSaving: boolean;

    rooms: IRoom[];
    dateFrom: string;
    dateTo: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected roomPricelistService: RoomPricelistService,
        protected roomService: RoomService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ roomPricelist }) => {
            this.roomPricelist = roomPricelist;
            this.dateFrom = this.roomPricelist.dateFrom != null ? this.roomPricelist.dateFrom.format(DATE_TIME_FORMAT) : null;
            this.dateTo = this.roomPricelist.dateTo != null ? this.roomPricelist.dateTo.format(DATE_TIME_FORMAT) : null;
        });
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
        this.roomPricelist.dateFrom = this.dateFrom != null ? moment(this.dateFrom, DATE_TIME_FORMAT) : null;
        this.roomPricelist.dateTo = this.dateTo != null ? moment(this.dateTo, DATE_TIME_FORMAT) : null;
        if (this.roomPricelist.id !== undefined) {
            this.subscribeToSaveResponse(this.roomPricelistService.update(this.roomPricelist));
        } else {
            this.subscribeToSaveResponse(this.roomPricelistService.create(this.roomPricelist));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRoomPricelist>>) {
        result.subscribe((res: HttpResponse<IRoomPricelist>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackRoomById(index: number, item: IRoom) {
        return item.id;
    }
}
