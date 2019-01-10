import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFlightStop } from 'app/shared/model/flight-stop.model';
import { AccountService } from 'app/core';
import { FlightStopService } from './flight-stop.service';

@Component({
    selector: 'jhi-flight-stop',
    templateUrl: './flight-stop.component.html'
})
export class FlightStopComponent implements OnInit, OnDestroy {
    flightStops: IFlightStop[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected flightStopService: FlightStopService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.flightStopService.query().subscribe(
            (res: HttpResponse<IFlightStop[]>) => {
                this.flightStops = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFlightStops();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFlightStop) {
        return item.id;
    }

    registerChangeInFlightStops() {
        this.eventSubscriber = this.eventManager.subscribe('flightStopListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
