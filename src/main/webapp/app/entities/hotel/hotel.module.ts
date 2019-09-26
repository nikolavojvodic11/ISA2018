import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlaneTicketsSharedModule } from 'app/shared';
import {
    HotelComponent,
    HotelDetailComponent,
    HotelUpdateComponent,
    HotelDeletePopupComponent,
    HotelDeleteDialogComponent,
    hotelRoute,
    hotelPopupRoute
} from './';
import { AgmCoreModule } from '@agm/core';

const ENTITY_STATES = [...hotelRoute, ...hotelPopupRoute];

@NgModule({
    imports: [
        PlaneTicketsSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDHga6I8-u6jMgHzcq1MK1XGd9pkx9epXw',
            libraries: ['places']
        })
    ],
    declarations: [HotelComponent, HotelDetailComponent, HotelUpdateComponent, HotelDeleteDialogComponent, HotelDeletePopupComponent],
    entryComponents: [HotelComponent, HotelUpdateComponent, HotelDeleteDialogComponent, HotelDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaneTicketsHotelModule {}
