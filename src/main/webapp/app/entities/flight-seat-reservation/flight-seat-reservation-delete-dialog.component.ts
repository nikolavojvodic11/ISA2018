import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFlightSeatReservation } from 'app/shared/model/flight-seat-reservation.model';
import { FlightSeatReservationService } from './flight-seat-reservation.service';

@Component({
    selector: 'jhi-flight-seat-reservation-delete-dialog',
    templateUrl: './flight-seat-reservation-delete-dialog.component.html'
})
export class FlightSeatReservationDeleteDialogComponent {
    flightSeatReservation: IFlightSeatReservation;

    constructor(
        protected flightSeatReservationService: FlightSeatReservationService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.flightSeatReservationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'flightSeatReservationListModification',
                content: 'Deleted an flightSeatReservation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-flight-seat-reservation-delete-popup',
    template: ''
})
export class FlightSeatReservationDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ flightSeatReservation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FlightSeatReservationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.flightSeatReservation = flightSeatReservation;
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
