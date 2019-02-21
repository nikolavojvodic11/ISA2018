import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHotelService } from 'app/shared/model/hotel-service.model';
import { AccountService } from 'app/core';
import { HotelServiceService } from './hotel-service.service';

@Component({
    selector: 'jhi-hotel-service',
    templateUrl: './hotel-service.component.html'
})
export class HotelServiceComponent implements OnInit, OnDestroy {
    hotelServices: IHotelService[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected hotelServiceService: HotelServiceService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.hotelServiceService.query().subscribe(
            (res: HttpResponse<IHotelService[]>) => {
                this.hotelServices = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInHotelServices();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHotelService) {
        return item.id;
    }

    registerChangeInHotelServices() {
        this.eventSubscriber = this.eventManager.subscribe('hotelServiceListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
