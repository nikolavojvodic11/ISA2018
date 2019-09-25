import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { FriendsComponent } from './friends.component';

export const friendsRoute: Route = {
    path: 'friends',
    component: FriendsComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Friends'
    },
    canActivate: [UserRouteAccessService]
};
