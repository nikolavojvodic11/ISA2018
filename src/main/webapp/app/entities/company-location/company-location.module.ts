import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlaneTicketsSharedModule } from 'app/shared';
import {
    CompanyLocationComponent,
    CompanyLocationDetailComponent,
    CompanyLocationUpdateComponent,
    CompanyLocationDeletePopupComponent,
    CompanyLocationDeleteDialogComponent,
    companyLocationRoute,
    companyLocationPopupRoute
} from './';

const ENTITY_STATES = [...companyLocationRoute, ...companyLocationPopupRoute];

@NgModule({
    imports: [PlaneTicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CompanyLocationComponent,
        CompanyLocationDetailComponent,
        CompanyLocationUpdateComponent,
        CompanyLocationDeleteDialogComponent,
        CompanyLocationDeletePopupComponent
    ],
    entryComponents: [
        CompanyLocationComponent,
        CompanyLocationUpdateComponent,
        CompanyLocationDeleteDialogComponent,
        CompanyLocationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaneTicketsCompanyLocationModule {}
