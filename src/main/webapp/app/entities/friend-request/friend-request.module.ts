import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlaneTicketsSharedModule } from 'app/shared';
import {
    FriendRequestComponent,
    FriendRequestDetailComponent,
    FriendRequestUpdateComponent,
    FriendRequestDeletePopupComponent,
    FriendRequestDeleteDialogComponent,
    friendRequestRoute,
    friendRequestPopupRoute
} from './';

const ENTITY_STATES = [...friendRequestRoute, ...friendRequestPopupRoute];

@NgModule({
    imports: [PlaneTicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FriendRequestComponent,
        FriendRequestDetailComponent,
        FriendRequestUpdateComponent,
        FriendRequestDeleteDialogComponent,
        FriendRequestDeletePopupComponent
    ],
    entryComponents: [
        FriendRequestComponent,
        FriendRequestUpdateComponent,
        FriendRequestDeleteDialogComponent,
        FriendRequestDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaneTicketsFriendRequestModule {}
