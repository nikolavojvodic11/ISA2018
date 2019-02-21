import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlaneTicketsSharedModule } from 'app/shared';
import {
    SeatComponent,
    SeatDetailComponent,
    SeatUpdateComponent,
    SeatDeletePopupComponent,
    SeatDeleteDialogComponent,
    seatRoute,
    seatPopupRoute
} from './';

const ENTITY_STATES = [...seatRoute, ...seatPopupRoute];

@NgModule({
    imports: [PlaneTicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [SeatComponent, SeatDetailComponent, SeatUpdateComponent, SeatDeleteDialogComponent, SeatDeletePopupComponent],
    entryComponents: [SeatComponent, SeatUpdateComponent, SeatDeleteDialogComponent, SeatDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaneTicketsSeatModule {}
