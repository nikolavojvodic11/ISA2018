/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlaneTicketsTestModule } from '../../../test.module';
import { IsaUserDetailComponent } from 'app/entities/isa-user/isa-user-detail.component';
import { IsaUser } from 'app/shared/model/isa-user.model';

describe('Component Tests', () => {
    describe('IsaUser Management Detail Component', () => {
        let comp: IsaUserDetailComponent;
        let fixture: ComponentFixture<IsaUserDetailComponent>;
        const route = ({ data: of({ isaUser: new IsaUser(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [IsaUserDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(IsaUserDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IsaUserDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.isaUser).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
