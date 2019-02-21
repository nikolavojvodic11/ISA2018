/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PlaneTicketsTestModule } from '../../../test.module';
import { FlightSeatReservationComponent } from 'app/entities/flight-seat-reservation/flight-seat-reservation.component';
import { FlightSeatReservationService } from 'app/entities/flight-seat-reservation/flight-seat-reservation.service';
import { FlightSeatReservation } from 'app/shared/model/flight-seat-reservation.model';

describe('Component Tests', () => {
    describe('FlightSeatReservation Management Component', () => {
        let comp: FlightSeatReservationComponent;
        let fixture: ComponentFixture<FlightSeatReservationComponent>;
        let service: FlightSeatReservationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [FlightSeatReservationComponent],
                providers: []
            })
                .overrideTemplate(FlightSeatReservationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FlightSeatReservationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlightSeatReservationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FlightSeatReservation(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.flightSeatReservations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
