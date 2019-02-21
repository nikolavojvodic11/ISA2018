import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFlightSeatReservation } from 'app/shared/model/flight-seat-reservation.model';

type EntityResponseType = HttpResponse<IFlightSeatReservation>;
type EntityArrayResponseType = HttpResponse<IFlightSeatReservation[]>;

@Injectable({ providedIn: 'root' })
export class FlightSeatReservationService {
    public resourceUrl = SERVER_API_URL + 'api/flight-seat-reservations';

    constructor(protected http: HttpClient) {}

    create(flightSeatReservation: IFlightSeatReservation): Observable<EntityResponseType> {
        return this.http.post<IFlightSeatReservation>(this.resourceUrl, flightSeatReservation, { observe: 'response' });
    }

    update(flightSeatReservation: IFlightSeatReservation): Observable<EntityResponseType> {
        return this.http.put<IFlightSeatReservation>(this.resourceUrl, flightSeatReservation, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFlightSeatReservation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFlightSeatReservation[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
