import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISeat } from 'app/shared/model/seat.model';

type EntityResponseType = HttpResponse<ISeat>;
type EntityArrayResponseType = HttpResponse<ISeat[]>;

@Injectable({ providedIn: 'root' })
export class SeatService {
    public resourceUrl = SERVER_API_URL + 'api/seats';

    constructor(protected http: HttpClient) {}

    create(seat: ISeat): Observable<EntityResponseType> {
        return this.http.post<ISeat>(this.resourceUrl, seat, { observe: 'response' });
    }

    update(seat: ISeat): Observable<EntityResponseType> {
        return this.http.put<ISeat>(this.resourceUrl, seat, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISeat>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISeat[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
