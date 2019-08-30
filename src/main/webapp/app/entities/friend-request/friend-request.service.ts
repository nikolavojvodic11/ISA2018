import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFriendRequest } from 'app/shared/model/friend-request.model';
import { IFlightSeatReservation } from '../../shared/model/flight-seat-reservation.model';

type EntityResponseType = HttpResponse<IFriendRequest>;
type EntityArrayResponseType = HttpResponse<IFriendRequest[]>;

@Injectable({ providedIn: 'root' })
export class FriendRequestService {
    public resourceUrl = SERVER_API_URL + 'api/friend-requests';

    constructor(protected http: HttpClient) {}

    create(friendRequest: IFriendRequest): Observable<EntityResponseType> {
        return this.http.post<IFriendRequest>(this.resourceUrl, friendRequest, { observe: 'response' });
    }

    update(friendRequest: IFriendRequest): Observable<EntityResponseType> {
        return this.http.put<IFriendRequest>(this.resourceUrl, friendRequest, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFriendRequest>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    getCurrentUserFriends(): Observable<EntityArrayResponseType> {
        return this.http.get<IFriendRequest[]>(`${this.resourceUrl}-by-user`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFriendRequest[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
