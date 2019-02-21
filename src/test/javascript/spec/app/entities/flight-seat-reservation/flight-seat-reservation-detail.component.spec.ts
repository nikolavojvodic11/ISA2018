/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlaneTicketsTestModule } from '../../../test.module';
import { FlightSeatReservationDetailComponent } from 'app/entities/flight-seat-reservation/flight-seat-reservation-detail.component';
import { FlightSeatReservation } from 'app/shared/model/flight-seat-reservation.model';

describe('Component Tests', () => {
    describe('FlightSeatReservation Management Detail Component', () => {
        let comp: FlightSeatReservationDetailComponent;
        let fixture: ComponentFixture<FlightSeatReservationDetailComponent>;
        const route = ({ data: of({ flightSeatReservation: new FlightSeatReservation(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [FlightSeatReservationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FlightSeatReservationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FlightSeatReservationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.flightSeatReservation).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
