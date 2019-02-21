import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlaneTicketsSharedModule } from 'app/shared';
import {
    FlightSeatReservationComponent,
    FlightSeatReservationDetailComponent,
    FlightSeatReservationUpdateComponent,
    FlightSeatReservationDeletePopupComponent,
    FlightSeatReservationDeleteDialogComponent,
    flightSeatReservationRoute,
    flightSeatReservationPopupRoute
} from './';

const ENTITY_STATES = [...flightSeatReservationRoute, ...flightSeatReservationPopupRoute];

@NgModule({
    imports: [PlaneTicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FlightSeatReservationComponent,
        FlightSeatReservationDetailComponent,
        FlightSeatReservationUpdateComponent,
        FlightSeatReservationDeleteDialogComponent,
        FlightSeatReservationDeletePopupComponent
    ],
    entryComponents: [
        FlightSeatReservationComponent,
        FlightSeatReservationUpdateComponent,
        FlightSeatReservationDeleteDialogComponent,
        FlightSeatReservationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaneTicketsFlightSeatReservationModule {}
