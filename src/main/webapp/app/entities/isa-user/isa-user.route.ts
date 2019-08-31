import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IsaUser } from 'app/shared/model/isa-user.model';
import { IsaUserService } from './isa-user.service';
import { IsaUserComponent } from './isa-user.component';
import { IsaUserDetailComponent } from './isa-user-detail.component';
import { IsaUserUpdateComponent } from './isa-user-update.component';
import { IsaUserDeletePopupComponent } from './isa-user-delete-dialog.component';
import { IIsaUser } from 'app/shared/model/isa-user.model';

@Injectable({ providedIn: 'root' })
export class IsaUserResolve implements Resolve<IIsaUser> {
    constructor(private service: IsaUserService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IsaUser> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<IsaUser>) => response.ok),
                map((isaUser: HttpResponse<IsaUser>) => isaUser.body)
            );
        }
        return of(new IsaUser());
    }
}

export const isaUserRoute: Routes = [
    {
        path: 'isa-user',
        component: IsaUserComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_AIRLINE_ADMIN', 'ROLE_HOTEL_ADMIN', 'ROLE_CAR_RENTAL_ADMIN'],
            pageTitle: 'IsaUsers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'isa-user/:id/view',
        component: IsaUserDetailComponent,
        resolve: {
            isaUser: IsaUserResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_AIRLINE_ADMIN', 'ROLE_HOTEL_ADMIN', 'ROLE_CAR_RENTAL_ADMIN'],
            pageTitle: 'IsaUsers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'isa-user/new',
        component: IsaUserUpdateComponent,
        resolve: {
            isaUser: IsaUserResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_AIRLINE_ADMIN', 'ROLE_HOTEL_ADMIN', 'ROLE_CAR_RENTAL_ADMIN'],
            pageTitle: 'IsaUsers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'isa-user/:id/edit',
        component: IsaUserUpdateComponent,
        resolve: {
            isaUser: IsaUserResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_AIRLINE_ADMIN', 'ROLE_HOTEL_ADMIN', 'ROLE_CAR_RENTAL_ADMIN'],
            pageTitle: 'IsaUsers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const isaUserPopupRoute: Routes = [
    {
        path: 'isa-user/:id/delete',
        component: IsaUserDeletePopupComponent,
        resolve: {
            isaUser: IsaUserResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_AIRLINE_ADMIN', 'ROLE_HOTEL_ADMIN', 'ROLE_CAR_RENTAL_ADMIN'],
            pageTitle: 'IsaUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
