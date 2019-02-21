import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HotelServiceReservation } from 'app/shared/model/hotel-service-reservation.model';
import { HotelServiceReservationService } from './hotel-service-reservation.service';
import { HotelServiceReservationComponent } from './hotel-service-reservation.component';
import { HotelServiceReservationDetailComponent } from './hotel-service-reservation-detail.component';
import { HotelServiceReservationUpdateComponent } from './hotel-service-reservation-update.component';
import { HotelServiceReservationDeletePopupComponent } from './hotel-service-reservation-delete-dialog.component';
import { IHotelServiceReservation } from 'app/shared/model/hotel-service-reservation.model';

@Injectable({ providedIn: 'root' })
export class HotelServiceReservationResolve implements Resolve<IHotelServiceReservation> {
    constructor(private service: HotelServiceReservationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HotelServiceReservation> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<HotelServiceReservation>) => response.ok),
                map((hotelServiceReservation: HttpResponse<HotelServiceReservation>) => hotelServiceReservation.body)
            );
        }
        return of(new HotelServiceReservation());
    }
}

export const hotelServiceReservationRoute: Routes = [
    {
        path: 'hotel-service-reservation',
        component: HotelServiceReservationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HotelServiceReservations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hotel-service-reservation/:id/view',
        component: HotelServiceReservationDetailComponent,
        resolve: {
            hotelServiceReservation: HotelServiceReservationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HotelServiceReservations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hotel-service-reservation/new',
        component: HotelServiceReservationUpdateComponent,
        resolve: {
            hotelServiceReservation: HotelServiceReservationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HotelServiceReservations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hotel-service-reservation/:id/edit',
        component: HotelServiceReservationUpdateComponent,
        resolve: {
            hotelServiceReservation: HotelServiceReservationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HotelServiceReservations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hotelServiceReservationPopupRoute: Routes = [
    {
        path: 'hotel-service-reservation/:id/delete',
        component: HotelServiceReservationDeletePopupComponent,
        resolve: {
            hotelServiceReservation: HotelServiceReservationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HotelServiceReservations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
