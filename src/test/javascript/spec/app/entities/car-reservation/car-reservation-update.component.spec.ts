/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PlaneTicketsTestModule } from '../../../test.module';
import { CarReservationUpdateComponent } from 'app/entities/car-reservation/car-reservation-update.component';
import { CarReservationService } from 'app/entities/car-reservation/car-reservation.service';
import { CarReservation } from 'app/shared/model/car-reservation.model';

describe('Component Tests', () => {
    describe('CarReservation Management Update Component', () => {
        let comp: CarReservationUpdateComponent;
        let fixture: ComponentFixture<CarReservationUpdateComponent>;
        let service: CarReservationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [CarReservationUpdateComponent]
            })
                .overrideTemplate(CarReservationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CarReservationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CarReservationService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new CarReservation(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.carReservation = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new CarReservation();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.carReservation = entity;
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
