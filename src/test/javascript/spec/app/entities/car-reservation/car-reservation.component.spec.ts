/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PlaneTicketsTestModule } from '../../../test.module';
import { CarReservationComponent } from 'app/entities/car-reservation/car-reservation.component';
import { CarReservationService } from 'app/entities/car-reservation/car-reservation.service';
import { CarReservation } from 'app/shared/model/car-reservation.model';

describe('Component Tests', () => {
    describe('CarReservation Management Component', () => {
        let comp: CarReservationComponent;
        let fixture: ComponentFixture<CarReservationComponent>;
        let service: CarReservationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [CarReservationComponent],
                providers: []
            })
                .overrideTemplate(CarReservationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CarReservationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CarReservationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CarReservation(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.carReservations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
