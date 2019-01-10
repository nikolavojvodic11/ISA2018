import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFlightStop } from 'app/shared/model/flight-stop.model';

type EntityResponseType = HttpResponse<IFlightStop>;
type EntityArrayResponseType = HttpResponse<IFlightStop[]>;

@Injectable({ providedIn: 'root' })
export class FlightStopService {
    public resourceUrl = SERVER_API_URL + 'api/flight-stops';

    constructor(protected http: HttpClient) {}

    create(flightStop: IFlightStop): Observable<EntityResponseType> {
        return this.http.post<IFlightStop>(this.resourceUrl, flightStop, { observe: 'response' });
    }

    update(flightStop: IFlightStop): Observable<EntityResponseType> {
        return this.http.put<IFlightStop>(this.resourceUrl, flightStop, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFlightStop>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFlightStop[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
