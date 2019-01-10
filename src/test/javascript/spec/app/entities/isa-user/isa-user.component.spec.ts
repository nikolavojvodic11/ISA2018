/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PlaneTicketsTestModule } from '../../../test.module';
import { IsaUserComponent } from 'app/entities/isa-user/isa-user.component';
import { IsaUserService } from 'app/entities/isa-user/isa-user.service';
import { IsaUser } from 'app/shared/model/isa-user.model';

describe('Component Tests', () => {
    describe('IsaUser Management Component', () => {
        let comp: IsaUserComponent;
        let fixture: ComponentFixture<IsaUserComponent>;
        let service: IsaUserService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [IsaUserComponent],
                providers: []
            })
                .overrideTemplate(IsaUserComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IsaUserComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IsaUserService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new IsaUser(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.isaUsers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
