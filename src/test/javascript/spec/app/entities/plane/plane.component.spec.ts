/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PlaneTicketsTestModule } from '../../../test.module';
import { PlaneComponent } from 'app/entities/plane/plane.component';
import { PlaneService } from 'app/entities/plane/plane.service';
import { Plane } from 'app/shared/model/plane.model';

describe('Component Tests', () => {
    describe('Plane Management Component', () => {
        let comp: PlaneComponent;
        let fixture: ComponentFixture<PlaneComponent>;
        let service: PlaneService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [PlaneComponent],
                providers: []
            })
                .overrideTemplate(PlaneComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PlaneComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlaneService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Plane(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.planes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
