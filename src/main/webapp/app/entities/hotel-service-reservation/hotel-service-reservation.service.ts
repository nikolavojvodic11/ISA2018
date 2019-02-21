import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHotelServiceReservation } from 'app/shared/model/hotel-service-reservation.model';

type EntityResponseType = HttpResponse<IHotelServiceReservation>;
type EntityArrayResponseType = HttpResponse<IHotelServiceReservation[]>;

@Injectable({ providedIn: 'root' })
export class HotelServiceReservationService {
    public resourceUrl = SERVER_API_URL + 'api/hotel-service-reservations';

    constructor(protected http: HttpClient) {}

    create(hotelServiceReservation: IHotelServiceReservation): Observable<EntityResponseType> {
        return this.http.post<IHotelServiceReservation>(this.resourceUrl, hotelServiceReservation, { observe: 'response' });
    }

    update(hotelServiceReservation: IHotelServiceReservation): Observable<EntityResponseType> {
        return this.http.put<IHotelServiceReservation>(this.resourceUrl, hotelServiceReservation, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IHotelServiceReservation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHotelServiceReservation[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
