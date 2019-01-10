import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlaneTicketsSharedModule } from 'app/shared';
import { PlaneTicketsAdminModule } from 'app/admin/admin.module';
import {
    IsaUserComponent,
    IsaUserDetailComponent,
    IsaUserUpdateComponent,
    IsaUserDeletePopupComponent,
    IsaUserDeleteDialogComponent,
    isaUserRoute,
    isaUserPopupRoute
} from './';

const ENTITY_STATES = [...isaUserRoute, ...isaUserPopupRoute];

@NgModule({
    imports: [PlaneTicketsSharedModule, PlaneTicketsAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        IsaUserComponent,
        IsaUserDetailComponent,
        IsaUserUpdateComponent,
        IsaUserDeleteDialogComponent,
        IsaUserDeletePopupComponent
    ],
    entryComponents: [IsaUserComponent, IsaUserUpdateComponent, IsaUserDeleteDialogComponent, IsaUserDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaneTicketsIsaUserModule {}
