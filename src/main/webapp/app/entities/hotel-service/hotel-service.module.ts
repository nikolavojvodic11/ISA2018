import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlaneTicketsSharedModule } from 'app/shared';
import {
    HotelServiceComponent,
    HotelServiceDetailComponent,
    HotelServiceUpdateComponent,
    HotelServiceDeletePopupComponent,
    HotelServiceDeleteDialogComponent,
    hotelServiceRoute,
    hotelServicePopupRoute
} from './';

const ENTITY_STATES = [...hotelServiceRoute, ...hotelServicePopupRoute];

@NgModule({
    imports: [PlaneTicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HotelServiceComponent,
        HotelServiceDetailComponent,
        HotelServiceUpdateComponent,
        HotelServiceDeleteDialogComponent,
        HotelServiceDeletePopupComponent
    ],
    entryComponents: [
        HotelServiceComponent,
        HotelServiceUpdateComponent,
        HotelServiceDeleteDialogComponent,
        HotelServiceDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaneTicketsHotelServiceModule {}
