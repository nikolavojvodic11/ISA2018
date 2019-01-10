import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlaneTicketsSharedModule } from 'app/shared';
import {
    CompanyTypeComponent,
    CompanyTypeDetailComponent,
    CompanyTypeUpdateComponent,
    CompanyTypeDeletePopupComponent,
    CompanyTypeDeleteDialogComponent,
    companyTypeRoute,
    companyTypePopupRoute
} from './';

const ENTITY_STATES = [...companyTypeRoute, ...companyTypePopupRoute];

@NgModule({
    imports: [PlaneTicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CompanyTypeComponent,
        CompanyTypeDetailComponent,
        CompanyTypeUpdateComponent,
        CompanyTypeDeleteDialogComponent,
        CompanyTypeDeletePopupComponent
    ],
    entryComponents: [CompanyTypeComponent, CompanyTypeUpdateComponent, CompanyTypeDeleteDialogComponent, CompanyTypeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaneTicketsCompanyTypeModule {}
