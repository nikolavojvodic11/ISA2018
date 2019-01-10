import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPlane } from 'app/shared/model/plane.model';
import { PlaneService } from './plane.service';
import { ICompany } from 'app/shared/model/company.model';
import { CompanyService } from 'app/entities/company';

@Component({
    selector: 'jhi-plane-update',
    templateUrl: './plane-update.component.html'
})
export class PlaneUpdateComponent implements OnInit {
    plane: IPlane;
    isSaving: boolean;

    companies: ICompany[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected planeService: PlaneService,
        protected companyService: CompanyService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ plane }) => {
            this.plane = plane;
        });
        this.companyService.query().subscribe(
            (res: HttpResponse<ICompany[]>) => {
                this.companies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.plane.id !== undefined) {
            this.subscribeToSaveResponse(this.planeService.update(this.plane));
        } else {
            this.subscribeToSaveResponse(this.planeService.create(this.plane));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlane>>) {
        result.subscribe((res: HttpResponse<IPlane>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCompanyById(index: number, item: ICompany) {
        return item.id;
    }
}
