/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PlaneTicketsTestModule } from '../../../test.module';
import { CompanyTypeUpdateComponent } from 'app/entities/company-type/company-type-update.component';
import { CompanyTypeService } from 'app/entities/company-type/company-type.service';
import { CompanyType } from 'app/shared/model/company-type.model';

describe('Component Tests', () => {
    describe('CompanyType Management Update Component', () => {
        let comp: CompanyTypeUpdateComponent;
        let fixture: ComponentFixture<CompanyTypeUpdateComponent>;
        let service: CompanyTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [CompanyTypeUpdateComponent]
            })
                .overrideTemplate(CompanyTypeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompanyTypeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyTypeService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new CompanyType(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.companyType = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new CompanyType();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.companyType = entity;
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
