import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HotelRoomReservation } from 'app/shared/model/hotel-room-reservation.model';
import { HotelRoomReservationService } from './hotel-room-reservation.service';
import { HotelRoomReservationComponent } from './hotel-room-reservation.component';
import { HotelRoomReservationDetailComponent } from './hotel-room-reservation-detail.component';
import { HotelRoomReservationUpdateComponent } from './hotel-room-reservation-update.component';
import { HotelRoomReservationDeletePopupComponent } from './hotel-room-reservation-delete-dialog.component';
import { IHotelRoomReservation } from 'app/shared/model/hotel-room-reservation.model';

@Injectable({ providedIn: 'root' })
export class HotelRoomReservationResolve implements Resolve<IHotelRoomReservation> {
    constructor(private service: HotelRoomReservationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HotelRoomReservation> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<HotelRoomReservation>) => response.ok),
                map((hotelRoomReservation: HttpResponse<HotelRoomReservation>) => hotelRoomReservation.body)
            );
        }
        return of(new HotelRoomReservation());
    }
}

export const hotelRoomReservationRoute: Routes = [
    {
        path: 'hotel-room-reservation',
        component: HotelRoomReservationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HotelRoomReservations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hotel-room-reservation/:id/view',
        component: HotelRoomReservationDetailComponent,
        resolve: {
            hotelRoomReservation: HotelRoomReservationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HotelRoomReservations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hotel-room-reservation/new',
        component: HotelRoomReservationUpdateComponent,
        resolve: {
            hotelRoomReservation: HotelRoomReservationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HotelRoomReservations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'hotel-room-reservation/:id/edit',
        component: HotelRoomReservationUpdateComponent,
        resolve: {
            hotelRoomReservation: HotelRoomReservationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HotelRoomReservations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hotelRoomReservationPopupRoute: Routes = [
    {
        path: 'hotel-room-reservation/:id/delete',
        component: HotelRoomReservationDeletePopupComponent,
        resolve: {
            hotelRoomReservation: HotelRoomReservationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HotelRoomReservations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
