/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PlaneTicketsTestModule } from '../../../test.module';
import { PlaneUpdateComponent } from 'app/entities/plane/plane-update.component';
import { PlaneService } from 'app/entities/plane/plane.service';
import { Plane } from 'app/shared/model/plane.model';

describe('Component Tests', () => {
    describe('Plane Management Update Component', () => {
        let comp: PlaneUpdateComponent;
        let fixture: ComponentFixture<PlaneUpdateComponent>;
        let service: PlaneService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [PlaneUpdateComponent]
            })
                .overrideTemplate(PlaneUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PlaneUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlaneService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Plane(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.plane = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Plane();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.plane = entity;
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
