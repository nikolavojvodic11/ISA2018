import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { RoomPricelist } from 'app/shared/model/room-pricelist.model';
import { RoomPricelistService } from './room-pricelist.service';
import { RoomPricelistComponent } from './room-pricelist.component';
import { RoomPricelistDetailComponent } from './room-pricelist-detail.component';
import { RoomPricelistUpdateComponent } from './room-pricelist-update.component';
import { RoomPricelistDeletePopupComponent } from './room-pricelist-delete-dialog.component';
import { IRoomPricelist } from 'app/shared/model/room-pricelist.model';

@Injectable({ providedIn: 'root' })
export class RoomPricelistResolve implements Resolve<IRoomPricelist> {
    constructor(private service: RoomPricelistService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RoomPricelist> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<RoomPricelist>) => response.ok),
                map((roomPricelist: HttpResponse<RoomPricelist>) => roomPricelist.body)
            );
        }
        return of(new RoomPricelist());
    }
}

export const roomPricelistRoute: Routes = [
    {
        path: 'room-pricelist',
        component: RoomPricelistComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoomPricelists'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'room-pricelist/:id/view',
        component: RoomPricelistDetailComponent,
        resolve: {
            roomPricelist: RoomPricelistResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoomPricelists'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'room-pricelist/new',
        component: RoomPricelistUpdateComponent,
        resolve: {
            roomPricelist: RoomPricelistResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoomPricelists'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'room-pricelist/:id/edit',
        component: RoomPricelistUpdateComponent,
        resolve: {
            roomPricelist: RoomPricelistResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoomPricelists'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const roomPricelistPopupRoute: Routes = [
    {
        path: 'room-pricelist/:id/delete',
        component: RoomPricelistDeletePopupComponent,
        resolve: {
            roomPricelist: RoomPricelistResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RoomPricelists'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
