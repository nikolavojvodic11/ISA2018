import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlaneTicketsSharedModule } from 'app/shared';
import {
    ReservationComponent,
    ReservationDetailComponent,
    ReservationUpdateComponent,
    ReservationDeletePopupComponent,
    ReservationDeleteDialogComponent,
    reservationRoute,
    reservationPopupRoute
} from './';

const ENTITY_STATES = [...reservationRoute, ...reservationPopupRoute];

@NgModule({
    imports: [PlaneTicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ReservationComponent,
        ReservationDetailComponent,
        ReservationUpdateComponent,
        ReservationDeleteDialogComponent,
        ReservationDeletePopupComponent
    ],
    entryComponents: [ReservationComponent, ReservationUpdateComponent, ReservationDeleteDialogComponent, ReservationDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaneTicketsReservationModule {}
