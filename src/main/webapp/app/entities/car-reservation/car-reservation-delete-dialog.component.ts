import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICarReservation } from 'app/shared/model/car-reservation.model';
import { CarReservationService } from './car-reservation.service';

@Component({
    selector: 'jhi-car-reservation-delete-dialog',
    templateUrl: './car-reservation-delete-dialog.component.html'
})
export class CarReservationDeleteDialogComponent {
    carReservation: ICarReservation;

    constructor(
        protected carReservationService: CarReservationService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.carReservationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'carReservationListModification',
                content: 'Deleted an carReservation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-car-reservation-delete-popup',
    template: ''
})
export class CarReservationDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ carReservation }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CarReservationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.carReservation = carReservation;
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
