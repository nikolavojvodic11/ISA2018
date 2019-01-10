import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CompanyType } from 'app/shared/model/company-type.model';
import { CompanyTypeService } from './company-type.service';
import { CompanyTypeComponent } from './company-type.component';
import { CompanyTypeDetailComponent } from './company-type-detail.component';
import { CompanyTypeUpdateComponent } from './company-type-update.component';
import { CompanyTypeDeletePopupComponent } from './company-type-delete-dialog.component';
import { ICompanyType } from 'app/shared/model/company-type.model';

@Injectable({ providedIn: 'root' })
export class CompanyTypeResolve implements Resolve<ICompanyType> {
    constructor(private service: CompanyTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CompanyType> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CompanyType>) => response.ok),
                map((companyType: HttpResponse<CompanyType>) => companyType.body)
            );
        }
        return of(new CompanyType());
    }
}

export const companyTypeRoute: Routes = [
    {
        path: 'company-type',
        component: CompanyTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanyTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'company-type/:id/view',
        component: CompanyTypeDetailComponent,
        resolve: {
            companyType: CompanyTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanyTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'company-type/new',
        component: CompanyTypeUpdateComponent,
        resolve: {
            companyType: CompanyTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanyTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'company-type/:id/edit',
        component: CompanyTypeUpdateComponent,
        resolve: {
            companyType: CompanyTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanyTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const companyTypePopupRoute: Routes = [
    {
        path: 'company-type/:id/delete',
        component: CompanyTypeDeletePopupComponent,
        resolve: {
            companyType: CompanyTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CompanyTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
