import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlaneTicketsSharedModule } from 'app/shared';
import {
    RoomPricelistComponent,
    RoomPricelistDetailComponent,
    RoomPricelistUpdateComponent,
    RoomPricelistDeletePopupComponent,
    RoomPricelistDeleteDialogComponent,
    roomPricelistRoute,
    roomPricelistPopupRoute
} from './';

const ENTITY_STATES = [...roomPricelistRoute, ...roomPricelistPopupRoute];

@NgModule({
    imports: [PlaneTicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RoomPricelistComponent,
        RoomPricelistDetailComponent,
        RoomPricelistUpdateComponent,
        RoomPricelistDeleteDialogComponent,
        RoomPricelistDeletePopupComponent
    ],
    entryComponents: [
        RoomPricelistComponent,
        RoomPricelistUpdateComponent,
        RoomPricelistDeleteDialogComponent,
        RoomPricelistDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaneTicketsRoomPricelistModule {}
