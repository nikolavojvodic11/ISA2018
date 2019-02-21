import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRoomPricelist } from 'app/shared/model/room-pricelist.model';

type EntityResponseType = HttpResponse<IRoomPricelist>;
type EntityArrayResponseType = HttpResponse<IRoomPricelist[]>;

@Injectable({ providedIn: 'root' })
export class RoomPricelistService {
    public resourceUrl = SERVER_API_URL + 'api/room-pricelists';

    constructor(protected http: HttpClient) {}

    create(roomPricelist: IRoomPricelist): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(roomPricelist);
        return this.http
            .post<IRoomPricelist>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(roomPricelist: IRoomPricelist): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(roomPricelist);
        return this.http
            .put<IRoomPricelist>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IRoomPricelist>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRoomPricelist[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(roomPricelist: IRoomPricelist): IRoomPricelist {
        const copy: IRoomPricelist = Object.assign({}, roomPricelist, {
            dateFrom: roomPricelist.dateFrom != null && roomPricelist.dateFrom.isValid() ? roomPricelist.dateFrom.toJSON() : null,
            dateTo: roomPricelist.dateTo != null && roomPricelist.dateTo.isValid() ? roomPricelist.dateTo.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dateFrom = res.body.dateFrom != null ? moment(res.body.dateFrom) : null;
            res.body.dateTo = res.body.dateTo != null ? moment(res.body.dateTo) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((roomPricelist: IRoomPricelist) => {
                roomPricelist.dateFrom = roomPricelist.dateFrom != null ? moment(roomPricelist.dateFrom) : null;
                roomPricelist.dateTo = roomPricelist.dateTo != null ? moment(roomPricelist.dateTo) : null;
            });
        }
        return res;
    }
}
