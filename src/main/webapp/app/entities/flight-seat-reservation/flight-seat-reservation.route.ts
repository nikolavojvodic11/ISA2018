import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FlightSeatReservation } from 'app/shared/model/flight-seat-reservation.model';
import { FlightSeatReservationService } from './flight-seat-reservation.service';
import { FlightSeatReservationComponent } from './flight-seat-reservation.component';
import { FlightSeatReservationDetailComponent } from './flight-seat-reservation-detail.component';
import { FlightSeatReservationUpdateComponent } from './flight-seat-reservation-update.component';
import { FlightSeatReservationDeletePopupComponent } from './flight-seat-reservation-delete-dialog.component';
import { IFlightSeatReservation } from 'app/shared/model/flight-seat-reservation.model';

@Injectable({ providedIn: 'root' })
export class FlightSeatReservationResolve implements Resolve<IFlightSeatReservation> {
    constructor(private service: FlightSeatReservationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FlightSeatReservation> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FlightSeatReservation>) => response.ok),
                map((flightSeatReservation: HttpResponse<FlightSeatReservation>) => flightSeatReservation.body)
            );
        }
        return of(new FlightSeatReservation());
    }
}

export const flightSeatReservationRoute: Routes = [
    {
        path: 'flight-seat-reservation',
        component: FlightSeatReservationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightSeatReservations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'flight-seat-reservation/:id/view',
        component: FlightSeatReservationDetailComponent,
        resolve: {
            flightSeatReservation: FlightSeatReservationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightSeatReservations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'flight-seat-reservation/new',
        component: FlightSeatReservationUpdateComponent,
        resolve: {
            flightSeatReservation: FlightSeatReservationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightSeatReservations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'flight-seat-reservation/:id/edit',
        component: FlightSeatReservationUpdateComponent,
        resolve: {
            flightSeatReservation: FlightSeatReservationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightSeatReservations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const flightSeatReservationPopupRoute: Routes = [
    {
        path: 'flight-seat-reservation/:id/delete',
        component: FlightSeatReservationDeletePopupComponent,
        resolve: {
            flightSeatReservation: FlightSeatReservationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightSeatReservations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
