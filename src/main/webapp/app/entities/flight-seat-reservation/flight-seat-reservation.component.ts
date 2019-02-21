import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFlightSeatReservation } from 'app/shared/model/flight-seat-reservation.model';
import { AccountService } from 'app/core';
import { FlightSeatReservationService } from './flight-seat-reservation.service';

@Component({
    selector: 'jhi-flight-seat-reservation',
    templateUrl: './flight-seat-reservation.component.html'
})
export class FlightSeatReservationComponent implements OnInit, OnDestroy {
    flightSeatReservations: IFlightSeatReservation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected flightSeatReservationService: FlightSeatReservationService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.flightSeatReservationService.query().subscribe(
            (res: HttpResponse<IFlightSeatReservation[]>) => {
                this.flightSeatReservations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFlightSeatReservations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFlightSeatReservation) {
        return item.id;
    }

    registerChangeInFlightSeatReservations() {
        this.eventSubscriber = this.eventManager.subscribe('flightSeatReservationListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
