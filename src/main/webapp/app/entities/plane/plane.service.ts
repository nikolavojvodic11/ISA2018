import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPlane } from 'app/shared/model/plane.model';

type EntityResponseType = HttpResponse<IPlane>;
type EntityArrayResponseType = HttpResponse<IPlane[]>;

@Injectable({ providedIn: 'root' })
export class PlaneService {
    public resourceUrl = SERVER_API_URL + 'api/planes';

    constructor(protected http: HttpClient) {}

    create(plane: IPlane): Observable<EntityResponseType> {
        return this.http.post<IPlane>(this.resourceUrl, plane, { observe: 'response' });
    }

    update(plane: IPlane): Observable<EntityResponseType> {
        return this.http.put<IPlane>(this.resourceUrl, plane, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPlane>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findByCompanyId(id: number, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPlane[]>(`${this.resourceUrl}ByCompanyId/${id}`, { params: options, observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPlane[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
