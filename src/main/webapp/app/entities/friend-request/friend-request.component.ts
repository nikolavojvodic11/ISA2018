import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFriendRequest } from 'app/shared/model/friend-request.model';
import { AccountService } from 'app/core';
import { FriendRequestService } from './friend-request.service';

@Component({
    selector: 'jhi-friend-request',
    templateUrl: './friend-request.component.html'
})
export class FriendRequestComponent implements OnInit, OnDestroy {
    friendRequests: IFriendRequest[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected friendRequestService: FriendRequestService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.friendRequestService.query().subscribe(
            (res: HttpResponse<IFriendRequest[]>) => {
                this.friendRequests = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFriendRequests();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFriendRequest) {
        return item.id;
    }

    registerChangeInFriendRequests() {
        this.eventSubscriber = this.eventManager.subscribe('friendRequestListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
