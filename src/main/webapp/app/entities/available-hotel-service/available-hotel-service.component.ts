import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAvailableHotelService } from 'app/shared/model/available-hotel-service.model';
import { AccountService } from 'app/core';
import { AvailableHotelServiceService } from './available-hotel-service.service';

@Component({
    selector: 'jhi-available-hotel-service',
    templateUrl: './available-hotel-service.component.html'
})
export class AvailableHotelServiceComponent implements OnInit, OnDestroy {
    availableHotelServices: IAvailableHotelService[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected availableHotelServiceService: AvailableHotelServiceService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.availableHotelServiceService.query().subscribe(
            (res: HttpResponse<IAvailableHotelService[]>) => {
                this.availableHotelServices = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAvailableHotelServices();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAvailableHotelService) {
        return item.id;
    }

    registerChangeInAvailableHotelServices() {
        this.eventSubscriber = this.eventManager.subscribe('availableHotelServiceListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
