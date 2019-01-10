import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlaneTicketsSharedModule } from 'app/shared';
import {
    FlightStopComponent,
    FlightStopDetailComponent,
    FlightStopUpdateComponent,
    FlightStopDeletePopupComponent,
    FlightStopDeleteDialogComponent,
    flightStopRoute,
    flightStopPopupRoute
} from './';

const ENTITY_STATES = [...flightStopRoute, ...flightStopPopupRoute];

@NgModule({
    imports: [PlaneTicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FlightStopComponent,
        FlightStopDetailComponent,
        FlightStopUpdateComponent,
        FlightStopDeleteDialogComponent,
        FlightStopDeletePopupComponent
    ],
    entryComponents: [FlightStopComponent, FlightStopUpdateComponent, FlightStopDeleteDialogComponent, FlightStopDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaneTicketsFlightStopModule {}
