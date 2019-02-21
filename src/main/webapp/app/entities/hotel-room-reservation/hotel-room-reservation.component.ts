import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHotelRoomReservation } from 'app/shared/model/hotel-room-reservation.model';
import { AccountService } from 'app/core';
import { HotelRoomReservationService } from './hotel-room-reservation.service';

@Component({
    selector: 'jhi-hotel-room-reservation',
    templateUrl: './hotel-room-reservation.component.html'
})
export class HotelRoomReservationComponent implements OnInit, OnDestroy {
    hotelRoomReservations: IHotelRoomReservation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected hotelRoomReservationService: HotelRoomReservationService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.hotelRoomReservationService.query().subscribe(
            (res: HttpResponse<IHotelRoomReservation[]>) => {
                this.hotelRoomReservations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInHotelRoomReservations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHotelRoomReservation) {
        return item.id;
    }

    registerChangeInHotelRoomReservations() {
        this.eventSubscriber = this.eventManager.subscribe('hotelRoomReservationListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
