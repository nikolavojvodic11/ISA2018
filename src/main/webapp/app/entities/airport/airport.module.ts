import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlaneTicketsSharedModule } from 'app/shared';
import {
    AirportComponent,
    AirportDetailComponent,
    AirportUpdateComponent,
    AirportDeletePopupComponent,
    AirportDeleteDialogComponent,
    airportRoute,
    airportPopupRoute
} from './';

const ENTITY_STATES = [...airportRoute, ...airportPopupRoute];

@NgModule({
    imports: [PlaneTicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AirportComponent,
        AirportDetailComponent,
        AirportUpdateComponent,
        AirportDeleteDialogComponent,
        AirportDeletePopupComponent
    ],
    entryComponents: [AirportComponent, AirportUpdateComponent, AirportDeleteDialogComponent, AirportDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaneTicketsAirportModule {}
