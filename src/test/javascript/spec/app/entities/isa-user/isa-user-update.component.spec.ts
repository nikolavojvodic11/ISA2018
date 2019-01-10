/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PlaneTicketsTestModule } from '../../../test.module';
import { IsaUserUpdateComponent } from 'app/entities/isa-user/isa-user-update.component';
import { IsaUserService } from 'app/entities/isa-user/isa-user.service';
import { IsaUser } from 'app/shared/model/isa-user.model';

describe('Component Tests', () => {
    describe('IsaUser Management Update Component', () => {
        let comp: IsaUserUpdateComponent;
        let fixture: ComponentFixture<IsaUserUpdateComponent>;
        let service: IsaUserService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [IsaUserUpdateComponent]
            })
                .overrideTemplate(IsaUserUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IsaUserUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IsaUserService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new IsaUser(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.isaUser = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new IsaUser();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.isaUser = entity;
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
