import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICompanyType } from 'app/shared/model/company-type.model';
import { CompanyTypeService } from './company-type.service';

@Component({
    selector: 'jhi-company-type-update',
    templateUrl: './company-type-update.component.html'
})
export class CompanyTypeUpdateComponent implements OnInit {
    companyType: ICompanyType;
    isSaving: boolean;

    constructor(protected companyTypeService: CompanyTypeService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ companyType }) => {
            this.companyType = companyType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.companyType.id !== undefined) {
            this.subscribeToSaveResponse(this.companyTypeService.update(this.companyType));
        } else {
            this.subscribeToSaveResponse(this.companyTypeService.create(this.companyType));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompanyType>>) {
        result.subscribe((res: HttpResponse<ICompanyType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
