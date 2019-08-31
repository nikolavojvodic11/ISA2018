import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HotelService } from 'app/shared/model/hotel-service.model';
import { HotelServiceService } from './hotel-service.service';
import { HotelServiceComponent } from './hotel-service.component';
import { HotelServiceDetailComponent } from './hotel-service-detail.component';
import { HotelServiceUpdateComponent } from './hotel-service-update.component';
import { HotelServiceDeletePopupComponent } from './hotel-service-delete-dialog.component';
import { IHotelService } from 'app/shared/model/hotel-service.model';

@Injectable({ providedIn: 'root' })
export class HotelServiceResolve implements Resolve<IHotelService> {
    constructor(private service: HotelServiceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HotelService> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<HotelService>) => response.ok),
                map((hotelService: HttpResponse<HotelService>) => hotelService.body)
            );
        }
        return of(new HotelService());
    }
}

export const hotelServiceRoute: Routes = [
    {
        path: 'hotel-service',
        component: HotelServiceComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_AIRLINE_ADMIN', 'ROLE_HOTEL_ADMIN', 'ROLE_CAR_RENTAL_ADMIN'],
            pageTitle: 'HotelServices'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hotel-service/:id/view',
        component: HotelServiceDetailComponent,
        resolve: {
            hotelService: HotelServiceResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_AIRLINE_ADMIN', 'ROLE_HOTEL_ADMIN', 'ROLE_CAR_RENTAL_ADMIN'],
            pageTitle: 'HotelServices'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hotel-service/new',
        component: HotelServiceUpdateComponent,
        resolve: {
            hotelService: HotelServiceResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_AIRLINE_ADMIN', 'ROLE_HOTEL_ADMIN', 'ROLE_CAR_RENTAL_ADMIN'],
            pageTitle: 'HotelServices'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hotel-service/:id/edit',
        component: HotelServiceUpdateComponent,
        resolve: {
            hotelService: HotelServiceResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_AIRLINE_ADMIN', 'ROLE_HOTEL_ADMIN', 'ROLE_CAR_RENTAL_ADMIN'],
            pageTitle: 'HotelServices'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hotelServicePopupRoute: Routes = [
    {
        path: 'hotel-service/:id/delete',
        component: HotelServiceDeletePopupComponent,
        resolve: {
            hotelService: HotelServiceResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_AIRLINE_ADMIN', 'ROLE_HOTEL_ADMIN', 'ROLE_CAR_RENTAL_ADMIN'],
            pageTitle: 'HotelServices'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
