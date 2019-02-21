/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PlaneTicketsTestModule } from '../../../test.module';
import { AvailableHotelServiceComponent } from 'app/entities/available-hotel-service/available-hotel-service.component';
import { AvailableHotelServiceService } from 'app/entities/available-hotel-service/available-hotel-service.service';
import { AvailableHotelService } from 'app/shared/model/available-hotel-service.model';

describe('Component Tests', () => {
    describe('AvailableHotelService Management Component', () => {
        let comp: AvailableHotelServiceComponent;
        let fixture: ComponentFixture<AvailableHotelServiceComponent>;
        let service: AvailableHotelServiceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [AvailableHotelServiceComponent],
                providers: []
            })
                .overrideTemplate(AvailableHotelServiceComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AvailableHotelServiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AvailableHotelServiceService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AvailableHotelService(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.availableHotelServices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
