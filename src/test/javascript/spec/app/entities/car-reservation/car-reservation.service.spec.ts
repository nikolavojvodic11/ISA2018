/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { CarReservationService } from 'app/entities/car-reservation/car-reservation.service';
import { ICarReservation, CarReservation, ReservationStatus } from 'app/shared/model/car-reservation.model';

describe('Service Tests', () => {
    describe('CarReservation Service', () => {
        let injector: TestBed;
        let service: CarReservationService;
        let httpMock: HttpTestingController;
        let elemDefault: ICarReservation;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(CarReservationService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new CarReservation(0, currentDate, currentDate, ReservationStatus.RESERVED, 0, 0, 0, 0, false);
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

            it('should create a CarReservation', async () => {
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
                    .create(new CarReservation(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a CarReservation', async () => {
                const returnedFromService = Object.assign(
                    {
                        dateFrom: currentDate.format(DATE_TIME_FORMAT),
                        dateTo: currentDate.format(DATE_TIME_FORMAT),
                        status: 'BBBBBB',
                        price: 1,
                        discount: 1,
                        carRentalRating: 1,
                        carRating: 1,
                        deleted: true
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

            it('should return a list of CarReservation', async () => {
                const returnedFromService = Object.assign(
                    {
                        dateFrom: currentDate.format(DATE_TIME_FORMAT),
                        dateTo: currentDate.format(DATE_TIME_FORMAT),
                        status: 'BBBBBB',
                        price: 1,
                        discount: 1,
                        carRentalRating: 1,
                        carRating: 1,
                        deleted: true
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

            it('should delete a CarReservation', async () => {
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
