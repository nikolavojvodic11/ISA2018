import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFlightTicket } from 'app/shared/model/flight-ticket.model';

type EntityResponseType = HttpResponse<IFlightTicket>;
type EntityArrayResponseType = HttpResponse<IFlightTicket[]>;

@Injectable({ providedIn: 'root' })
export class FlightTicketService {
    public resourceUrl = SERVER_API_URL + 'api/flight-tickets';

    constructor(protected http: HttpClient) {}

    create(flightTicket: IFlightTicket): Observable<EntityResponseType> {
        return this.http.post<IFlightTicket>(this.resourceUrl, flightTicket, { observe: 'response' });
    }

    update(flightTicket: IFlightTicket): Observable<EntityResponseType> {
        return this.http.put<IFlightTicket>(this.resourceUrl, flightTicket, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFlightTicket>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFlightTicket[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
