/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PlaneTicketsTestModule } from '../../../test.module';
import { HotelServiceReservationUpdateComponent } from 'app/entities/hotel-service-reservation/hotel-service-reservation-update.component';
import { HotelServiceReservationService } from 'app/entities/hotel-service-reservation/hotel-service-reservation.service';
import { HotelServiceReservation } from 'app/shared/model/hotel-service-reservation.model';

describe('Component Tests', () => {
    describe('HotelServiceReservation Management Update Component', () => {
        let comp: HotelServiceReservationUpdateComponent;
        let fixture: ComponentFixture<HotelServiceReservationUpdateComponent>;
        let service: HotelServiceReservationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [HotelServiceReservationUpdateComponent]
            })
                .overrideTemplate(HotelServiceReservationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HotelServiceReservationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HotelServiceReservationService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new HotelServiceReservation(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.hotelServiceReservation = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new HotelServiceReservation();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.hotelServiceReservation = entity;
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
