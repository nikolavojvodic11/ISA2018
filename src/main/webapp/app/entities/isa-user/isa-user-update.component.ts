import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IIsaUser } from 'app/shared/model/isa-user.model';
import { IsaUserService } from './isa-user.service';
import { IUser, UserService } from 'app/core';
import { ICity } from 'app/shared/model/city.model';
import { CityService } from 'app/entities/city';
import { ICompany } from 'app/shared/model/company.model';
import { CompanyService } from 'app/entities/company';

@Component({
    selector: 'jhi-isa-user-update',
    templateUrl: './isa-user-update.component.html'
})
export class IsaUserUpdateComponent implements OnInit {
    isaUser: IIsaUser;
    isSaving: boolean;

    users: IUser[];

    cities: ICity[];

    companies: ICompany[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected isaUserService: IsaUserService,
        protected userService: UserService,
        protected cityService: CityService,
        protected companyService: CompanyService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ isaUser }) => {
            this.isaUser = isaUser;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.cityService.query().subscribe(
            (res: HttpResponse<ICity[]>) => {
                this.cities = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
        if (this.isaUser.id !== undefined) {
            this.subscribeToSaveResponse(this.isaUserService.update(this.isaUser));
        } else {
            this.subscribeToSaveResponse(this.isaUserService.create(this.isaUser));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IIsaUser>>) {
        result.subscribe((res: HttpResponse<IIsaUser>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackCityById(index: number, item: ICity) {
        return item.id;
    }

    trackCompanyById(index: number, item: ICompany) {
        return item.id;
    }
}
