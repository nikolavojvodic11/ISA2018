import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlaneTicketsSharedModule } from 'app/shared';
import {
    FlightComponent,
    FlightDetailComponent,
    FlightUpdateComponent,
    FlightDeletePopupComponent,
    FlightDeleteDialogComponent,
    flightRoute,
    flightPopupRoute
} from './';

const ENTITY_STATES = [...flightRoute, ...flightPopupRoute];

@NgModule({
    imports: [PlaneTicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [FlightComponent, FlightDetailComponent, FlightUpdateComponent, FlightDeleteDialogComponent, FlightDeletePopupComponent],
    entryComponents: [FlightComponent, FlightUpdateComponent, FlightDeleteDialogComponent, FlightDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaneTicketsFlightModule {}
