/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PlaneTicketsTestModule } from '../../../test.module';
import { AvailableHotelServiceUpdateComponent } from 'app/entities/available-hotel-service/available-hotel-service-update.component';
import { AvailableHotelServiceService } from 'app/entities/available-hotel-service/available-hotel-service.service';
import { AvailableHotelService } from 'app/shared/model/available-hotel-service.model';

describe('Component Tests', () => {
    describe('AvailableHotelService Management Update Component', () => {
        let comp: AvailableHotelServiceUpdateComponent;
        let fixture: ComponentFixture<AvailableHotelServiceUpdateComponent>;
        let service: AvailableHotelServiceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [AvailableHotelServiceUpdateComponent]
            })
                .overrideTemplate(AvailableHotelServiceUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AvailableHotelServiceUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AvailableHotelServiceService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new AvailableHotelService(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.availableHotelService = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new AvailableHotelService();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.availableHotelService = entity;
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
