import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHotelRoomReservation } from 'app/shared/model/hotel-room-reservation.model';
import { IRoom } from '../../shared/model/room.model';

type EntityResponseType = HttpResponse<IHotelRoomReservation>;
type EntityArrayResponseType = HttpResponse<IHotelRoomReservation[]>;

@Injectable({ providedIn: 'root' })
export class HotelRoomReservationService {
    public resourceUrl = SERVER_API_URL + 'api/hotel-room-reservations';

    constructor(protected http: HttpClient) {}

    create(hotelRoomReservation: IHotelRoomReservation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(hotelRoomReservation);
        return this.http
            .post<IHotelRoomReservation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(hotelRoomReservation: IHotelRoomReservation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(hotelRoomReservation);
        return this.http
            .put<IHotelRoomReservation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IHotelRoomReservation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    findByHotelIdAndReserved(id: number, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IHotelRoomReservation[]>(`api/roomReservationsByHotelId/${id}`, { params: options, observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IHotelRoomReservation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(hotelRoomReservation: IHotelRoomReservation): IHotelRoomReservation {
        const copy: IHotelRoomReservation = Object.assign({}, hotelRoomReservation, {
            dateFrom:
                hotelRoomReservation.dateFrom != null && hotelRoomReservation.dateFrom.isValid()
                    ? hotelRoomReservation.dateFrom.toJSON()
                    : null,
            dateTo:
                hotelRoomReservation.dateTo != null && hotelRoomReservation.dateTo.isValid() ? hotelRoomReservation.dateTo.toJSON() : null
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
            res.body.forEach((hotelRoomReservation: IHotelRoomReservation) => {
                hotelRoomReservation.dateFrom = hotelRoomReservation.dateFrom != null ? moment(hotelRoomReservation.dateFrom) : null;
                hotelRoomReservation.dateTo = hotelRoomReservation.dateTo != null ? moment(hotelRoomReservation.dateTo) : null;
            });
        }
        return res;
    }
}
