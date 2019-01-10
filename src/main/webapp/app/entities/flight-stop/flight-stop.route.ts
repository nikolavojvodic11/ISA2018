import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FlightStop } from 'app/shared/model/flight-stop.model';
import { FlightStopService } from './flight-stop.service';
import { FlightStopComponent } from './flight-stop.component';
import { FlightStopDetailComponent } from './flight-stop-detail.component';
import { FlightStopUpdateComponent } from './flight-stop-update.component';
import { FlightStopDeletePopupComponent } from './flight-stop-delete-dialog.component';
import { IFlightStop } from 'app/shared/model/flight-stop.model';

@Injectable({ providedIn: 'root' })
export class FlightStopResolve implements Resolve<IFlightStop> {
    constructor(private service: FlightStopService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FlightStop> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FlightStop>) => response.ok),
                map((flightStop: HttpResponse<FlightStop>) => flightStop.body)
            );
        }
        return of(new FlightStop());
    }
}

export const flightStopRoute: Routes = [
    {
        path: 'flight-stop',
        component: FlightStopComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightStops'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'flight-stop/:id/view',
        component: FlightStopDetailComponent,
        resolve: {
            flightStop: FlightStopResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightStops'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'flight-stop/new',
        component: FlightStopUpdateComponent,
        resolve: {
            flightStop: FlightStopResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightStops'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'flight-stop/:id/edit',
        component: FlightStopUpdateComponent,
        resolve: {
            flightStop: FlightStopResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightStops'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const flightStopPopupRoute: Routes = [
    {
        path: 'flight-stop/:id/delete',
        component: FlightStopDeletePopupComponent,
        resolve: {
            flightStop: FlightStopResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightStops'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
