/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PlaneTicketsTestModule } from '../../../test.module';
import { HotelServiceComponent } from 'app/entities/hotel-service/hotel-service.component';
import { HotelServiceService } from 'app/entities/hotel-service/hotel-service.service';
import { HotelService } from 'app/shared/model/hotel-service.model';

describe('Component Tests', () => {
    describe('HotelService Management Component', () => {
        let comp: HotelServiceComponent;
        let fixture: ComponentFixture<HotelServiceComponent>;
        let service: HotelServiceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [HotelServiceComponent],
                providers: []
            })
                .overrideTemplate(HotelServiceComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HotelServiceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HotelServiceService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new HotelService(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.hotelServices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
