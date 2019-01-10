import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlaneTicketsSharedModule } from 'app/shared';
import {
    FlightTicketComponent,
    FlightTicketDetailComponent,
    FlightTicketUpdateComponent,
    FlightTicketDeletePopupComponent,
    FlightTicketDeleteDialogComponent,
    flightTicketRoute,
    flightTicketPopupRoute
} from './';

const ENTITY_STATES = [...flightTicketRoute, ...flightTicketPopupRoute];

@NgModule({
    imports: [PlaneTicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FlightTicketComponent,
        FlightTicketDetailComponent,
        FlightTicketUpdateComponent,
        FlightTicketDeleteDialogComponent,
        FlightTicketDeletePopupComponent
    ],
    entryComponents: [
        FlightTicketComponent,
        FlightTicketUpdateComponent,
        FlightTicketDeleteDialogComponent,
        FlightTicketDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaneTicketsFlightTicketModule {}
