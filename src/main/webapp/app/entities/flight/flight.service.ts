import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFlight } from 'app/shared/model/flight.model';

type EntityResponseType = HttpResponse<IFlight>;
type EntityArrayResponseType = HttpResponse<IFlight[]>;

@Injectable({ providedIn: 'root' })
export class FlightService {
    public resourceUrl = SERVER_API_URL + 'api/flights';

    constructor(protected http: HttpClient) {}

    create(flight: IFlight): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(flight);
        return this.http
            .post<IFlight>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(flight: IFlight): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(flight);
        return this.http
            .put<IFlight>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFlight>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    findByCompanyId(id: number, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFlight[]>(`${this.resourceUrl}ByCompanyId/${id}`, { params: options, observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFlight[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(flight: IFlight): IFlight {
        const copy: IFlight = Object.assign({}, flight, {
            departureTime: flight.departureTime != null && flight.departureTime.isValid() ? flight.departureTime.toJSON() : null,
            arrivalTime: flight.arrivalTime != null && flight.arrivalTime.isValid() ? flight.arrivalTime.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.departureTime = res.body.departureTime != null ? moment(res.body.departureTime) : null;
            res.body.arrivalTime = res.body.arrivalTime != null ? moment(res.body.arrivalTime) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((flight: IFlight) => {
                flight.departureTime = flight.departureTime != null ? moment(flight.departureTime) : null;
                flight.arrivalTime = flight.arrivalTime != null ? moment(flight.arrivalTime) : null;
            });
        }
        return res;
    }
}
