import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICompanyType } from 'app/shared/model/company-type.model';
import { AccountService } from 'app/core';
import { CompanyTypeService } from './company-type.service';

@Component({
    selector: 'jhi-company-type',
    templateUrl: './company-type.component.html'
})
export class CompanyTypeComponent implements OnInit, OnDestroy {
    companyTypes: ICompanyType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected companyTypeService: CompanyTypeService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.companyTypeService.query().subscribe(
            (res: HttpResponse<ICompanyType[]>) => {
                this.companyTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCompanyTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICompanyType) {
        return item.id;
    }

    registerChangeInCompanyTypes() {
        this.eventSubscriber = this.eventManager.subscribe('companyTypeListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
