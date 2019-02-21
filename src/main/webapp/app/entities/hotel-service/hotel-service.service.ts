import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHotelService } from 'app/shared/model/hotel-service.model';

type EntityResponseType = HttpResponse<IHotelService>;
type EntityArrayResponseType = HttpResponse<IHotelService[]>;

@Injectable({ providedIn: 'root' })
export class HotelServiceService {
    public resourceUrl = SERVER_API_URL + 'api/hotel-services';

    constructor(protected http: HttpClient) {}

    create(hotelService: IHotelService): Observable<EntityResponseType> {
        return this.http.post<IHotelService>(this.resourceUrl, hotelService, { observe: 'response' });
    }

    update(hotelService: IHotelService): Observable<EntityResponseType> {
        return this.http.put<IHotelService>(this.resourceUrl, hotelService, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IHotelService>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHotelService[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
