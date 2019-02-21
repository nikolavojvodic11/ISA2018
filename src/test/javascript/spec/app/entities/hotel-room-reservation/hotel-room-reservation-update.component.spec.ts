/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PlaneTicketsTestModule } from '../../../test.module';
import { HotelRoomReservationUpdateComponent } from 'app/entities/hotel-room-reservation/hotel-room-reservation-update.component';
import { HotelRoomReservationService } from 'app/entities/hotel-room-reservation/hotel-room-reservation.service';
import { HotelRoomReservation } from 'app/shared/model/hotel-room-reservation.model';

describe('Component Tests', () => {
    describe('HotelRoomReservation Management Update Component', () => {
        let comp: HotelRoomReservationUpdateComponent;
        let fixture: ComponentFixture<HotelRoomReservationUpdateComponent>;
        let service: HotelRoomReservationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [HotelRoomReservationUpdateComponent]
            })
                .overrideTemplate(HotelRoomReservationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HotelRoomReservationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HotelRoomReservationService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new HotelRoomReservation(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.hotelRoomReservation = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new HotelRoomReservation();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.hotelRoomReservation = entity;
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
