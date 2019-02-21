import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlaneTicketsSharedModule } from 'app/shared';
import {
    AvailableHotelServiceComponent,
    AvailableHotelServiceDetailComponent,
    AvailableHotelServiceUpdateComponent,
    AvailableHotelServiceDeletePopupComponent,
    AvailableHotelServiceDeleteDialogComponent,
    availableHotelServiceRoute,
    availableHotelServicePopupRoute
} from './';

const ENTITY_STATES = [...availableHotelServiceRoute, ...availableHotelServicePopupRoute];

@NgModule({
    imports: [PlaneTicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AvailableHotelServiceComponent,
        AvailableHotelServiceDetailComponent,
        AvailableHotelServiceUpdateComponent,
        AvailableHotelServiceDeleteDialogComponent,
        AvailableHotelServiceDeletePopupComponent
    ],
    entryComponents: [
        AvailableHotelServiceComponent,
        AvailableHotelServiceUpdateComponent,
        AvailableHotelServiceDeleteDialogComponent,
        AvailableHotelServiceDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaneTicketsAvailableHotelServiceModule {}
