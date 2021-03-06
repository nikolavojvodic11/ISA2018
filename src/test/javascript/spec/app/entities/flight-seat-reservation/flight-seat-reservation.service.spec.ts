/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { FlightSeatReservationService } from 'app/entities/flight-seat-reservation/flight-seat-reservation.service';
import { IFlightSeatReservation, FlightSeatReservation, ReservationStatus } from 'app/shared/model/flight-seat-reservation.model';

describe('Service Tests', () => {
    describe('FlightSeatReservation Service', () => {
        let injector: TestBed;
        let service: FlightSeatReservationService;
        let httpMock: HttpTestingController;
        let elemDefault: IFlightSeatReservation;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(FlightSeatReservationService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new FlightSeatReservation(
                0,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                ReservationStatus.RESERVED,
                0,
                0,
                'AAAAAAA',
                false,
                0,
                0,
                0,
                0,
                0,
                false
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a FlightSeatReservation', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new FlightSeatReservation(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a FlightSeatReservation', async () => {
                const returnedFromService = Object.assign(
                    {
                        firstName: 'BBBBBB',
                        lastName: 'BBBBBB',
                        passportNumber: 'BBBBBB',
                        status: 'BBBBBB',
                        flightNumber: 1,
                        seatRow: 1,
                        seatCol: 'BBBBBB',
                        business: true,
                        price: 1,
                        discount: 1,
                        airlineRating: 1,
                        flightRating: 1,
                        pointsEarned: 1,
                        deleted: true
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of FlightSeatReservation', async () => {
                const returnedFromService = Object.assign(
                    {
                        firstName: 'BBBBBB',
                        lastName: 'BBBBBB',
                        passportNumber: 'BBBBBB',
                        status: 'BBBBBB',
                        flightNumber: 1,
                        seatRow: 1,
                        seatCol: 'BBBBBB',
                        business: true,
                        price: 1,
                        discount: 1,
                        airlineRating: 1,
                        flightRating: 1,
                        pointsEarned: 1,
                        deleted: true
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
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

            it('should delete a FlightSeatReservation', async () => {
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
