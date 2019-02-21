import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRoomPricelist } from 'app/shared/model/room-pricelist.model';
import { RoomPricelistService } from './room-pricelist.service';

@Component({
    selector: 'jhi-room-pricelist-delete-dialog',
    templateUrl: './room-pricelist-delete-dialog.component.html'
})
export class RoomPricelistDeleteDialogComponent {
    roomPricelist: IRoomPricelist;

    constructor(
        protected roomPricelistService: RoomPricelistService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.roomPricelistService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'roomPricelistListModification',
                content: 'Deleted an roomPricelist'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-room-pricelist-delete-popup',
    template: ''
})
export class RoomPricelistDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ roomPricelist }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RoomPricelistDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.roomPricelist = roomPricelist;
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
