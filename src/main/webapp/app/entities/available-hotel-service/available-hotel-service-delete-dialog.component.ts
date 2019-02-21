import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAvailableHotelService } from 'app/shared/model/available-hotel-service.model';
import { AvailableHotelServiceService } from './available-hotel-service.service';

@Component({
    selector: 'jhi-available-hotel-service-delete-dialog',
    templateUrl: './available-hotel-service-delete-dialog.component.html'
})
export class AvailableHotelServiceDeleteDialogComponent {
    availableHotelService: IAvailableHotelService;

    constructor(
        protected availableHotelServiceService: AvailableHotelServiceService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.availableHotelServiceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'availableHotelServiceListModification',
                content: 'Deleted an availableHotelService'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-available-hotel-service-delete-popup',
    template: ''
})
export class AvailableHotelServiceDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ availableHotelService }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AvailableHotelServiceDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.availableHotelService = availableHotelService;
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
