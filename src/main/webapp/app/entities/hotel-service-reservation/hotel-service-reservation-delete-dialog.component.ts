import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHotelServiceReservation } from 'app/shared/model/hotel-service-reservation.model';
import { HotelServiceReservationService } from './hotel-service-reservation.service';

@Component({
    selector: 'jhi-hotel-service-reservation-delete-dialog',
    templateUrl: './hotel-service-reservation-delete-dialog.component.html'
})
export class HotelServiceReservationDeleteDialogComponent {
    hotelServiceReservation: IHotelServiceReservation;

    constructor(
        protected hotelServiceReservationService: HotelServiceReservationService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.hotelServiceReservationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'hotelServiceReservationListModification',
                content: 'Deleted an hotelServiceReservation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-hotel-service-reservation-delete-popup',
    template: ''
})
export class HotelServiceReservationDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hotelServiceReservation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HotelServiceReservationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.hotelServiceReservation = hotelServiceReservation;
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
