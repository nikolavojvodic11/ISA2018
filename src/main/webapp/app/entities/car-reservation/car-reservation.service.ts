import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICarReservation } from 'app/shared/model/car-reservation.model';
import { IHotelRoomReservation } from '../../shared/model/hotel-room-reservation.model';
import { ICar } from '../../shared/model/car.model';

type EntityResponseType = HttpResponse<ICarReservation>;
type EntityArrayResponseType = HttpResponse<ICarReservation[]>;

@Injectable({ providedIn: 'root' })
export class CarReservationService {
    public resourceUrl = SERVER_API_URL + 'api/car-reservations';

    constructor(protected http: HttpClient) {}

    create(carReservation: ICarReservation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(carReservation);
        return this.http
            .post<ICarReservation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(carReservation: ICarReservation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(carReservation);
        return this.http
            .put<ICarReservation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICarReservation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    findByCompanyLocationAndReserved(id: number, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICar[]>(`api/carReservationsByCompanyLocationId/${id}`, { params: options, observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICarReservation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(carReservation: ICarReservation): ICarReservation {
        const copy: ICarReservation = Object.assign({}, carReservation, {
            dateFrom: carReservation.dateFrom != null && carReservation.dateFrom.isValid() ? carReservation.dateFrom.toJSON() : null,
            dateTo: carReservation.dateTo != null && carReservation.dateTo.isValid() ? carReservation.dateTo.toJSON() : null
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
            res.body.forEach((carReservation: ICarReservation) => {
                carReservation.dateFrom = carReservation.dateFrom != null ? moment(carReservation.dateFrom) : null;
                carReservation.dateTo = carReservation.dateTo != null ? moment(carReservation.dateTo) : null;
            });
        }
        return res;
    }
}
