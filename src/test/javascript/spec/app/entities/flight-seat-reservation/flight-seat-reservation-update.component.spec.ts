/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PlaneTicketsTestModule } from '../../../test.module';
import { FlightSeatReservationUpdateComponent } from 'app/entities/flight-seat-reservation/flight-seat-reservation-update.component';
import { FlightSeatReservationService } from 'app/entities/flight-seat-reservation/flight-seat-reservation.service';
import { FlightSeatReservation } from 'app/shared/model/flight-seat-reservation.model';

describe('Component Tests', () => {
    describe('FlightSeatReservation Management Update Component', () => {
        let comp: FlightSeatReservationUpdateComponent;
        let fixture: ComponentFixture<FlightSeatReservationUpdateComponent>;
        let service: FlightSeatReservationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [FlightSeatReservationUpdateComponent]
            })
                .overrideTemplate(FlightSeatReservationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FlightSeatReservationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlightSeatReservationService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new FlightSeatReservation(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.flightSeatReservation = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new FlightSeatReservation();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.flightSeatReservation = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
