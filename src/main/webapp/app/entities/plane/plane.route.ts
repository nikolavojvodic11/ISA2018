import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Plane } from 'app/shared/model/plane.model';
import { PlaneService } from './plane.service';
import { PlaneComponent } from './plane.component';
import { PlaneDetailComponent } from './plane-detail.component';
import { PlaneUpdateComponent } from './plane-update.component';
import { PlaneDeletePopupComponent } from './plane-delete-dialog.component';
import { IPlane } from 'app/shared/model/plane.model';

@Injectable({ providedIn: 'root' })
export class PlaneResolve implements Resolve<IPlane> {
    constructor(private service: PlaneService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Plane> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Plane>) => response.ok),
                map((plane: HttpResponse<Plane>) => plane.body)
            );
        }
        return of(new Plane());
    }
}

export const planeRoute: Routes = [
    {
        path: 'plane',
        component: PlaneComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_AIRLINE_ADMIN', 'ROLE_HOTEL_ADMIN', 'ROLE_CAR_RENTAL_ADMIN'],
            pageTitle: 'Planes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'plane/:id/view',
        component: PlaneDetailComponent,
        resolve: {
            plane: PlaneResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_AIRLINE_ADMIN', 'ROLE_HOTEL_ADMIN', 'ROLE_CAR_RENTAL_ADMIN'],
            pageTitle: 'Planes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'plane/new',
        component: PlaneUpdateComponent,
        resolve: {
            plane: PlaneResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_AIRLINE_ADMIN', 'ROLE_HOTEL_ADMIN', 'ROLE_CAR_RENTAL_ADMIN'],
            pageTitle: 'Planes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'plane/:id/edit',
        component: PlaneUpdateComponent,
        resolve: {
            plane: PlaneResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_AIRLINE_ADMIN', 'ROLE_HOTEL_ADMIN', 'ROLE_CAR_RENTAL_ADMIN'],
            pageTitle: 'Planes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const planePopupRoute: Routes = [
    {
        path: 'plane/:id/delete',
        component: PlaneDeletePopupComponent,
        resolve: {
            plane: PlaneResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_AIRLINE_ADMIN', 'ROLE_HOTEL_ADMIN', 'ROLE_CAR_RENTAL_ADMIN'],
            pageTitle: 'Planes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
