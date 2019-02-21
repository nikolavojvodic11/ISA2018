/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PlaneTicketsTestModule } from '../../../test.module';
import { HotelServiceReservationComponent } from 'app/entities/hotel-service-reservation/hotel-service-reservation.component';
import { HotelServiceReservationService } from 'app/entities/hotel-service-reservation/hotel-service-reservation.service';
import { HotelServiceReservation } from 'app/shared/model/hotel-service-reservation.model';

describe('Component Tests', () => {
    describe('HotelServiceReservation Management Component', () => {
        let comp: HotelServiceReservationComponent;
        let fixture: ComponentFixture<HotelServiceReservationComponent>;
        let service: HotelServiceReservationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [HotelServiceReservationComponent],
                providers: []
            })
                .overrideTemplate(HotelServiceReservationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HotelServiceReservationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HotelServiceReservationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new HotelServiceReservation(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.hotelServiceReservations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
