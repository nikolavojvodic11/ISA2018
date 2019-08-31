import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CarReservation } from 'app/shared/model/car-reservation.model';
import { CarReservationService } from './car-reservation.service';
import { CarReservationComponent } from './car-reservation.component';
import { CarReservationDetailComponent } from './car-reservation-detail.component';
import { CarReservationUpdateComponent } from './car-reservation-update.component';
import { CarReservationDeletePopupComponent } from './car-reservation-delete-dialog.component';
import { ICarReservation } from 'app/shared/model/car-reservation.model';

@Injectable({ providedIn: 'root' })
export class CarReservationResolve implements Resolve<ICarReservation> {
    constructor(private service: CarReservationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CarReservation> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CarReservation>) => response.ok),
                map((carReservation: HttpResponse<CarReservation>) => carReservation.body)
            );
        }
        return of(new CarReservation());
    }
}

export const carReservationRoute: Routes = [
    {
        path: 'car-reservation',
        component: CarReservationComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_AIRLINE_ADMIN', 'ROLE_HOTEL_ADMIN', 'ROLE_CAR_RENTAL_ADMIN'],
            pageTitle: 'CarReservations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'car-reservation/:id/view',
        component: CarReservationDetailComponent,
        resolve: {
            carReservation: CarReservationResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_AIRLINE_ADMIN', 'ROLE_HOTEL_ADMIN', 'ROLE_CAR_RENTAL_ADMIN'],
            pageTitle: 'CarReservations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'car-reservation/new',
        component: CarReservationUpdateComponent,
        resolve: {
            carReservation: CarReservationResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_AIRLINE_ADMIN', 'ROLE_HOTEL_ADMIN', 'ROLE_CAR_RENTAL_ADMIN'],
            pageTitle: 'CarReservations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'car-reservation/:id/edit',
        component: CarReservationUpdateComponent,
        resolve: {
            carReservation: CarReservationResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_AIRLINE_ADMIN', 'ROLE_HOTEL_ADMIN', 'ROLE_CAR_RENTAL_ADMIN'],
            pageTitle: 'CarReservations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const carReservationPopupRoute: Routes = [
    {
        path: 'car-reservation/:id/delete',
        component: CarReservationDeletePopupComponent,
        resolve: {
            carReservation: CarReservationResolve
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_AIRLINE_ADMIN', 'ROLE_HOTEL_ADMIN', 'ROLE_CAR_RENTAL_ADMIN'],
            pageTitle: 'CarReservations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
