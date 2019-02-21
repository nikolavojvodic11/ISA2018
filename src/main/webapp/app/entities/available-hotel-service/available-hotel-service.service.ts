import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAvailableHotelService } from 'app/shared/model/available-hotel-service.model';

type EntityResponseType = HttpResponse<IAvailableHotelService>;
type EntityArrayResponseType = HttpResponse<IAvailableHotelService[]>;

@Injectable({ providedIn: 'root' })
export class AvailableHotelServiceService {
    public resourceUrl = SERVER_API_URL + 'api/available-hotel-services';

    constructor(protected http: HttpClient) {}

    create(availableHotelService: IAvailableHotelService): Observable<EntityResponseType> {
        return this.http.post<IAvailableHotelService>(this.resourceUrl, availableHotelService, { observe: 'response' });
    }

    update(availableHotelService: IAvailableHotelService): Observable<EntityResponseType> {
        return this.http.put<IAvailableHotelService>(this.resourceUrl, availableHotelService, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAvailableHotelService>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAvailableHotelService[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
