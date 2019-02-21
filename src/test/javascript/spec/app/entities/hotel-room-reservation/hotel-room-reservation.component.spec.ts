/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PlaneTicketsTestModule } from '../../../test.module';
import { HotelRoomReservationComponent } from 'app/entities/hotel-room-reservation/hotel-room-reservation.component';
import { HotelRoomReservationService } from 'app/entities/hotel-room-reservation/hotel-room-reservation.service';
import { HotelRoomReservation } from 'app/shared/model/hotel-room-reservation.model';

describe('Component Tests', () => {
    describe('HotelRoomReservation Management Component', () => {
        let comp: HotelRoomReservationComponent;
        let fixture: ComponentFixture<HotelRoomReservationComponent>;
        let service: HotelRoomReservationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [HotelRoomReservationComponent],
                providers: []
            })
                .overrideTemplate(HotelRoomReservationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HotelRoomReservationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HotelRoomReservationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new HotelRoomReservation(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.hotelRoomReservations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
