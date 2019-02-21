/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { RoomPricelistService } from 'app/entities/room-pricelist/room-pricelist.service';
import { IRoomPricelist, RoomPricelist } from 'app/shared/model/room-pricelist.model';

describe('Service Tests', () => {
    describe('RoomPricelist Service', () => {
        let injector: TestBed;
        let service: RoomPricelistService;
        let httpMock: HttpTestingController;
        let elemDefault: IRoomPricelist;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(RoomPricelistService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new RoomPricelist(0, currentDate, currentDate, 0);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dateFrom: currentDate.format(DATE_TIME_FORMAT),
                        dateTo: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a RoomPricelist', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        dateFrom: currentDate.format(DATE_TIME_FORMAT),
                        dateTo: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateFrom: currentDate,
                        dateTo: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new RoomPricelist(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a RoomPricelist', async () => {
                const returnedFromService = Object.assign(
                    {
                        dateFrom: currentDate.format(DATE_TIME_FORMAT),
                        dateTo: currentDate.format(DATE_TIME_FORMAT),
                        price: 1
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dateFrom: currentDate,
                        dateTo: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of RoomPricelist', async () => {
                const returnedFromService = Object.assign(
                    {
                        dateFrom: currentDate.format(DATE_TIME_FORMAT),
                        dateTo: currentDate.format(DATE_TIME_FORMAT),
                        price: 1
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateFrom: currentDate,
                        dateTo: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a RoomPricelist', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
