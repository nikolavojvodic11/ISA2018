import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FriendRequest } from 'app/shared/model/friend-request.model';
import { FriendRequestService } from './friend-request.service';
import { FriendRequestComponent } from './friend-request.component';
import { FriendRequestDetailComponent } from './friend-request-detail.component';
import { FriendRequestUpdateComponent } from './friend-request-update.component';
import { FriendRequestDeletePopupComponent } from './friend-request-delete-dialog.component';
import { IFriendRequest } from 'app/shared/model/friend-request.model';

@Injectable({ providedIn: 'root' })
export class FriendRequestResolve implements Resolve<IFriendRequest> {
    constructor(private service: FriendRequestService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FriendRequest> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FriendRequest>) => response.ok),
                map((friendRequest: HttpResponse<FriendRequest>) => friendRequest.body)
            );
        }
        return of(new FriendRequest());
    }
}

export const friendRequestRoute: Routes = [
    {
        path: 'friend-request',
        component: FriendRequestComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FriendRequests'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'friend-request/:id/view',
        component: FriendRequestDetailComponent,
        resolve: {
            friendRequest: FriendRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FriendRequests'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'friend-request/new',
        component: FriendRequestUpdateComponent,
        resolve: {
            friendRequest: FriendRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FriendRequests'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'friend-request/:id/edit',
        component: FriendRequestUpdateComponent,
        resolve: {
            friendRequest: FriendRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FriendRequests'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const friendRequestPopupRoute: Routes = [
    {
        path: 'friend-request/:id/delete',
        component: FriendRequestDeletePopupComponent,
        resolve: {
            friendRequest: FriendRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FriendRequests'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
