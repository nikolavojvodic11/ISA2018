/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PlaneTicketsTestModule } from '../../../test.module';
import { CompanyLocationUpdateComponent } from 'app/entities/company-location/company-location-update.component';
import { CompanyLocationService } from 'app/entities/company-location/company-location.service';
import { CompanyLocation } from 'app/shared/model/company-location.model';

describe('Component Tests', () => {
    describe('CompanyLocation Management Update Component', () => {
        let comp: CompanyLocationUpdateComponent;
        let fixture: ComponentFixture<CompanyLocationUpdateComponent>;
        let service: CompanyLocationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [CompanyLocationUpdateComponent]
            })
                .overrideTemplate(CompanyLocationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompanyLocationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyLocationService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new CompanyLocation(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.companyLocation = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new CompanyLocation();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.companyLocation = entity;
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
