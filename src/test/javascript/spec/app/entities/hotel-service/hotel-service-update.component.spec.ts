/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PlaneTicketsTestModule } from '../../../test.module';
import { HotelServiceUpdateComponent } from 'app/entities/hotel-service/hotel-service-update.component';
import { HotelServiceService } from 'app/entities/hotel-service/hotel-service.service';
import { HotelService } from 'app/shared/model/hotel-service.model';

describe('Component Tests', () => {
    describe('HotelService Management Update Component', () => {
        let comp: HotelServiceUpdateComponent;
        let fixture: ComponentFixture<HotelServiceUpdateComponent>;
        let service: HotelServiceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [HotelServiceUpdateComponent]
            })
                .overrideTemplate(HotelServiceUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HotelServiceUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HotelServiceService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new HotelService(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.hotelService = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new HotelService();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.hotelService = entity;
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
