import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICarReservation } from 'app/shared/model/car-reservation.model';
import { AccountService } from 'app/core';
import { CarReservationService } from './car-reservation.service';

@Component({
    selector: 'jhi-car-reservation',
    templateUrl: './car-reservation.component.html'
})
export class CarReservationComponent implements OnInit, OnDestroy {
    carReservations: ICarReservation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected carReservationService: CarReservationService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.carReservationService.query().subscribe(
            (res: HttpResponse<ICarReservation[]>) => {
                this.carReservations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCarReservations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICarReservation) {
        return item.id;
    }

    registerChangeInCarReservations() {
        this.eventSubscriber = this.eventManager.subscribe('carReservationListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
