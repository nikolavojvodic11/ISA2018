import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHotelRoomReservation } from 'app/shared/model/hotel-room-reservation.model';
import { HotelRoomReservationService } from './hotel-room-reservation.service';

@Component({
    selector: 'jhi-hotel-room-reservation-delete-dialog',
    templateUrl: './hotel-room-reservation-delete-dialog.component.html'
})
export class HotelRoomReservationDeleteDialogComponent {
    hotelRoomReservation: IHotelRoomReservation;

    constructor(
        protected hotelRoomReservationService: HotelRoomReservationService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.hotelRoomReservationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'hotelRoomReservationListModification',
                content: 'Deleted an hotelRoomReservation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-hotel-room-reservation-delete-popup',
    template: ''
})
export class HotelRoomReservationDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hotelRoomReservation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HotelRoomReservationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.hotelRoomReservation = hotelRoomReservation;
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
