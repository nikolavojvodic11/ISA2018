import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFlightStop } from 'app/shared/model/flight-stop.model';
import { FlightStopService } from './flight-stop.service';

@Component({
    selector: 'jhi-flight-stop-delete-dialog',
    templateUrl: './flight-stop-delete-dialog.component.html'
})
export class FlightStopDeleteDialogComponent {
    flightStop: IFlightStop;

    constructor(
        protected flightStopService: FlightStopService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.flightStopService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'flightStopListModification',
                content: 'Deleted an flightStop'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-flight-stop-delete-popup',
    template: ''
})
export class FlightStopDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ flightStop }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FlightStopDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.flightStop = flightStop;
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
