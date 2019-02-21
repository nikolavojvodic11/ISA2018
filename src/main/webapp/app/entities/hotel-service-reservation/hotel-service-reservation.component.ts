import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHotelServiceReservation } from 'app/shared/model/hotel-service-reservation.model';
import { AccountService } from 'app/core';
import { HotelServiceReservationService } from './hotel-service-reservation.service';

@Component({
    selector: 'jhi-hotel-service-reservation',
    templateUrl: './hotel-service-reservation.component.html'
})
export class HotelServiceReservationComponent implements OnInit, OnDestroy {
    hotelServiceReservations: IHotelServiceReservation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected hotelServiceReservationService: HotelServiceReservationService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.hotelServiceReservationService.query().subscribe(
            (res: HttpResponse<IHotelServiceReservation[]>) => {
                this.hotelServiceReservations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInHotelServiceReservations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHotelServiceReservation) {
        return item.id;
    }

    registerChangeInHotelServiceReservations() {
        this.eventSubscriber = this.eventManager.subscribe('hotelServiceReservationListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
