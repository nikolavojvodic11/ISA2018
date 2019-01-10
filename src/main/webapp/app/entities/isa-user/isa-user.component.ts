import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IIsaUser } from 'app/shared/model/isa-user.model';
import { AccountService } from 'app/core';
import { IsaUserService } from './isa-user.service';

@Component({
    selector: 'jhi-isa-user',
    templateUrl: './isa-user.component.html'
})
export class IsaUserComponent implements OnInit, OnDestroy {
    isaUsers: IIsaUser[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected isaUserService: IsaUserService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.isaUserService.query().subscribe(
            (res: HttpResponse<IIsaUser[]>) => {
                this.isaUsers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInIsaUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IIsaUser) {
        return item.id;
    }

    registerChangeInIsaUsers() {
        this.eventSubscriber = this.eventManager.subscribe('isaUserListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
