import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlaneTicketsSharedModule } from 'app/shared';
import {
    HotelServiceReservationComponent,
    HotelServiceReservationDetailComponent,
    HotelServiceReservationUpdateComponent,
    HotelServiceReservationDeletePopupComponent,
    HotelServiceReservationDeleteDialogComponent,
    hotelServiceReservationRoute,
    hotelServiceReservationPopupRoute
} from './';

const ENTITY_STATES = [...hotelServiceReservationRoute, ...hotelServiceReservationPopupRoute];

@NgModule({
    imports: [PlaneTicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HotelServiceReservationComponent,
        HotelServiceReservationDetailComponent,
        HotelServiceReservationUpdateComponent,
        HotelServiceReservationDeleteDialogComponent,
        HotelServiceReservationDeletePopupComponent
    ],
    entryComponents: [
        HotelServiceReservationComponent,
        HotelServiceReservationUpdateComponent,
        HotelServiceReservationDeleteDialogComponent,
        HotelServiceReservationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaneTicketsHotelServiceReservationModule {}
