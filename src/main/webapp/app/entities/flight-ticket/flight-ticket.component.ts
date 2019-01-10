import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFlightTicket } from 'app/shared/model/flight-ticket.model';
import { AccountService } from 'app/core';
import { FlightTicketService } from './flight-ticket.service';

@Component({
    selector: 'jhi-flight-ticket',
    templateUrl: './flight-ticket.component.html'
})
export class FlightTicketComponent implements OnInit, OnDestroy {
    flightTickets: IFlightTicket[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected flightTicketService: FlightTicketService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.flightTicketService.query().subscribe(
            (res: HttpResponse<IFlightTicket[]>) => {
                this.flightTickets = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFlightTickets();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFlightTicket) {
        return item.id;
    }

    registerChangeInFlightTickets() {
        this.eventSubscriber = this.eventManager.subscribe('flightTicketListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
