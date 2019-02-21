import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AvailableHotelService } from 'app/shared/model/available-hotel-service.model';
import { AvailableHotelServiceService } from './available-hotel-service.service';
import { AvailableHotelServiceComponent } from './available-hotel-service.component';
import { AvailableHotelServiceDetailComponent } from './available-hotel-service-detail.component';
import { AvailableHotelServiceUpdateComponent } from './available-hotel-service-update.component';
import { AvailableHotelServiceDeletePopupComponent } from './available-hotel-service-delete-dialog.component';
import { IAvailableHotelService } from 'app/shared/model/available-hotel-service.model';

@Injectable({ providedIn: 'root' })
export class AvailableHotelServiceResolve implements Resolve<IAvailableHotelService> {
    constructor(private service: AvailableHotelServiceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AvailableHotelService> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AvailableHotelService>) => response.ok),
                map((availableHotelService: HttpResponse<AvailableHotelService>) => availableHotelService.body)
            );
        }
        return of(new AvailableHotelService());
    }
}

export const availableHotelServiceRoute: Routes = [
    {
        path: 'available-hotel-service',
        component: AvailableHotelServiceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AvailableHotelServices'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'available-hotel-service/:id/view',
        component: AvailableHotelServiceDetailComponent,
        resolve: {
            availableHotelService: AvailableHotelServiceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AvailableHotelServices'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'available-hotel-service/new',
        component: AvailableHotelServiceUpdateComponent,
        resolve: {
            availableHotelService: AvailableHotelServiceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AvailableHotelServices'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'available-hotel-service/:id/edit',
        component: AvailableHotelServiceUpdateComponent,
        resolve: {
            availableHotelService: AvailableHotelServiceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AvailableHotelServices'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const availableHotelServicePopupRoute: Routes = [
    {
        path: 'available-hotel-service/:id/delete',
        component: AvailableHotelServiceDeletePopupComponent,
        resolve: {
            availableHotelService: AvailableHotelServiceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AvailableHotelServices'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
