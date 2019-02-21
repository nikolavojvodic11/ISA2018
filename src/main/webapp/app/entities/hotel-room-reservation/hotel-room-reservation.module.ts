import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlaneTicketsSharedModule } from 'app/shared';
import {
    HotelRoomReservationComponent,
    HotelRoomReservationDetailComponent,
    HotelRoomReservationUpdateComponent,
    HotelRoomReservationDeletePopupComponent,
    HotelRoomReservationDeleteDialogComponent,
    hotelRoomReservationRoute,
    hotelRoomReservationPopupRoute
} from './';

const ENTITY_STATES = [...hotelRoomReservationRoute, ...hotelRoomReservationPopupRoute];

@NgModule({
    imports: [PlaneTicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HotelRoomReservationComponent,
        HotelRoomReservationDetailComponent,
        HotelRoomReservationUpdateComponent,
        HotelRoomReservationDeleteDialogComponent,
        HotelRoomReservationDeletePopupComponent
    ],
    entryComponents: [
        HotelRoomReservationComponent,
        HotelRoomReservationUpdateComponent,
        HotelRoomReservationDeleteDialogComponent,
        HotelRoomReservationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaneTicketsHotelRoomReservationModule {}
