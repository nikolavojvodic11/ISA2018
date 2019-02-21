import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFriendRequest } from 'app/shared/model/friend-request.model';
import { FriendRequestService } from './friend-request.service';

@Component({
    selector: 'jhi-friend-request-delete-dialog',
    templateUrl: './friend-request-delete-dialog.component.html'
})
export class FriendRequestDeleteDialogComponent {
    friendRequest: IFriendRequest;

    constructor(
        protected friendRequestService: FriendRequestService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.friendRequestService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'friendRequestListModification',
                content: 'Deleted an friendRequest'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-friend-request-delete-popup',
    template: ''
})
export class FriendRequestDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ friendRequest }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FriendRequestDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.friendRequest = friendRequest;
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
