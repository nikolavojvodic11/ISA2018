import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFlightTicket } from 'app/shared/model/flight-ticket.model';
import { FlightTicketService } from './flight-ticket.service';

@Component({
    selector: 'jhi-flight-ticket-delete-dialog',
    templateUrl: './flight-ticket-delete-dialog.component.html'
})
export class FlightTicketDeleteDialogComponent {
    flightTicket: IFlightTicket;

    constructor(
        protected flightTicketService: FlightTicketService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.flightTicketService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'flightTicketListModification',
                content: 'Deleted an flightTicket'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-flight-ticket-delete-popup',
    template: ''
})
export class FlightTicketDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ flightTicket }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FlightTicketDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.flightTicket = flightTicket;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
