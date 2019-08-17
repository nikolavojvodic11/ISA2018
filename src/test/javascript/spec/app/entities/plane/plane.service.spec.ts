/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { PlaneService } from 'app/entities/plane/plane.service';
import { IPlane, Plane } from 'app/shared/model/plane.model';

describe('Service Tests', () => {
    describe('Plane Service', () => {
        let injector: TestBed;
        let service: PlaneService;
        let httpMock: HttpTestingController;
        let elemDefault: IPlane;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(PlaneService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new Plane(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 0, 0, 0, 0, 'AAAAAAA', false);
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

            it('should create a Plane', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new Plane(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Plane', async () => {
                const returnedFromService = Object.assign(
                    {
                        manufacturer: 'BBBBBB',
                        model: 'BBBBBB',
                        registration: 'BBBBBB',
                        rowsCount: 1,
                        colsCount: 1,
                        businessRowsCount: 1,
                        businessColsCount: 1,
                        unavailableSeats: 'BBBBBB',
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

            it('should return a list of Plane', async () => {
                const returnedFromService = Object.assign(
                    {
                        manufacturer: 'BBBBBB',
                        model: 'BBBBBB',
                        registration: 'BBBBBB',
                        rowsCount: 1,
                        colsCount: 1,
                        businessRowsCount: 1,
                        businessColsCount: 1,
                        unavailableSeats: 'BBBBBB',
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

            it('should delete a Plane', async () => {
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
