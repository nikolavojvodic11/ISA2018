import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlaneTicketsSharedModule } from 'app/shared';
import {
    PlaneComponent,
    PlaneDetailComponent,
    PlaneUpdateComponent,
    PlaneDeletePopupComponent,
    PlaneDeleteDialogComponent,
    planeRoute,
    planePopupRoute
} from './';

const ENTITY_STATES = [...planeRoute, ...planePopupRoute];

@NgModule({
    imports: [PlaneTicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [PlaneComponent, PlaneDetailComponent, PlaneUpdateComponent, PlaneDeleteDialogComponent, PlaneDeletePopupComponent],
    entryComponents: [PlaneComponent, PlaneUpdateComponent, PlaneDeleteDialogComponent, PlaneDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaneTicketsPlaneModule {}
