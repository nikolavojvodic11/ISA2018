import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIsaUser } from 'app/shared/model/isa-user.model';
import { IsaUserService } from './isa-user.service';

@Component({
    selector: 'jhi-isa-user-delete-dialog',
    templateUrl: './isa-user-delete-dialog.component.html'
})
export class IsaUserDeleteDialogComponent {
    isaUser: IIsaUser;

    constructor(protected isaUserService: IsaUserService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.isaUserService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'isaUserListModification',
                content: 'Deleted an isaUser'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-isa-user-delete-popup',
    template: ''
})
export class IsaUserDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ isaUser }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(IsaUserDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.isaUser = isaUser;
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
