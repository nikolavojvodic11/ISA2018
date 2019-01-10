/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlaneTicketsTestModule } from '../../../test.module';
import { PlaneDetailComponent } from 'app/entities/plane/plane-detail.component';
import { Plane } from 'app/shared/model/plane.model';

describe('Component Tests', () => {
    describe('Plane Management Detail Component', () => {
        let comp: PlaneDetailComponent;
        let fixture: ComponentFixture<PlaneDetailComponent>;
        const route = ({ data: of({ plane: new Plane(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [PlaneDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PlaneDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PlaneDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.plane).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
