import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlaneTicketsSharedModule } from 'app/shared';
import {
    CarReservationComponent,
    CarReservationDetailComponent,
    CarReservationUpdateComponent,
    CarReservationDeletePopupComponent,
    CarReservationDeleteDialogComponent,
    carReservationRoute,
    carReservationPopupRoute
} from './';

const ENTITY_STATES = [...carReservationRoute, ...carReservationPopupRoute];

@NgModule({
    imports: [PlaneTicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CarReservationComponent,
        CarReservationDetailComponent,
        CarReservationUpdateComponent,
        CarReservationDeleteDialogComponent,
        CarReservationDeletePopupComponent
    ],
    entryComponents: [
        CarReservationComponent,
        CarReservationUpdateComponent,
        CarReservationDeleteDialogComponent,
        CarReservationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaneTicketsCarReservationModule {}
