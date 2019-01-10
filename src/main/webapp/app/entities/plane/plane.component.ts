import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPlane } from 'app/shared/model/plane.model';
import { AccountService } from 'app/core';
import { PlaneService } from './plane.service';

@Component({
    selector: 'jhi-plane',
    templateUrl: './plane.component.html'
})
export class PlaneComponent implements OnInit, OnDestroy {
    planes: IPlane[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected planeService: PlaneService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.planeService.query().subscribe(
            (res: HttpResponse<IPlane[]>) => {
                this.planes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPlanes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPlane) {
        return item.id;
    }

    registerChangeInPlanes() {
        this.eventSubscriber = this.eventManager.subscribe('planeListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
