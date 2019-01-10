import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FlightTicket } from 'app/shared/model/flight-ticket.model';
import { FlightTicketService } from './flight-ticket.service';
import { FlightTicketComponent } from './flight-ticket.component';
import { FlightTicketDetailComponent } from './flight-ticket-detail.component';
import { FlightTicketUpdateComponent } from './flight-ticket-update.component';
import { FlightTicketDeletePopupComponent } from './flight-ticket-delete-dialog.component';
import { IFlightTicket } from 'app/shared/model/flight-ticket.model';

@Injectable({ providedIn: 'root' })
export class FlightTicketResolve implements Resolve<IFlightTicket> {
    constructor(private service: FlightTicketService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FlightTicket> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FlightTicket>) => response.ok),
                map((flightTicket: HttpResponse<FlightTicket>) => flightTicket.body)
            );
        }
        return of(new FlightTicket());
    }
}

export const flightTicketRoute: Routes = [
    {
        path: 'flight-ticket',
        component: FlightTicketComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightTickets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'flight-ticket/:id/view',
        component: FlightTicketDetailComponent,
        resolve: {
            flightTicket: FlightTicketResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightTickets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'flight-ticket/new',
        component: FlightTicketUpdateComponent,
        resolve: {
            flightTicket: FlightTicketResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightTickets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'flight-ticket/:id/edit',
        component: FlightTicketUpdateComponent,
        resolve: {
            flightTicket: FlightTicketResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightTickets'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const flightTicketPopupRoute: Routes = [
    {
        path: 'flight-ticket/:id/delete',
        component: FlightTicketDeletePopupComponent,
        resolve: {
            flightTicket: FlightTicketResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightTickets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
