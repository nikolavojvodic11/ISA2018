import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHotelService } from 'app/shared/model/hotel-service.model';
import { HotelServiceService } from './hotel-service.service';

@Component({
    selector: 'jhi-hotel-service-delete-dialog',
    templateUrl: './hotel-service-delete-dialog.component.html'
})
export class HotelServiceDeleteDialogComponent {
    hotelService: IHotelService;

    constructor(
        protected hotelServiceService: HotelServiceService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.hotelServiceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'hotelServiceListModification',
                content: 'Deleted an hotelService'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-hotel-service-delete-popup',
    template: ''
})
export class HotelServiceDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hotelService }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HotelServiceDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.hotelService = hotelService;
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
