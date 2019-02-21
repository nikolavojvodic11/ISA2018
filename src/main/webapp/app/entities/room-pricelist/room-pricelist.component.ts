import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRoomPricelist } from 'app/shared/model/room-pricelist.model';
import { AccountService } from 'app/core';
import { RoomPricelistService } from './room-pricelist.service';

@Component({
    selector: 'jhi-room-pricelist',
    templateUrl: './room-pricelist.component.html'
})
export class RoomPricelistComponent implements OnInit, OnDestroy {
    roomPricelists: IRoomPricelist[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected roomPricelistService: RoomPricelistService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.roomPricelistService.query().subscribe(
            (res: HttpResponse<IRoomPricelist[]>) => {
                this.roomPricelists = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRoomPricelists();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRoomPricelist) {
        return item.id;
    }

    registerChangeInRoomPricelists() {
        this.eventSubscriber = this.eventManager.subscribe('roomPricelistListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
