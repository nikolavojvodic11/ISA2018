/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlaneTicketsTestModule } from '../../../test.module';
import { HotelRoomReservationDetailComponent } from 'app/entities/hotel-room-reservation/hotel-room-reservation-detail.component';
import { HotelRoomReservation } from 'app/shared/model/hotel-room-reservation.model';

describe('Component Tests', () => {
    describe('HotelRoomReservation Management Detail Component', () => {
        let comp: HotelRoomReservationDetailComponent;
        let fixture: ComponentFixture<HotelRoomReservationDetailComponent>;
        const route = ({ data: of({ hotelRoomReservation: new HotelRoomReservation(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [HotelRoomReservationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HotelRoomReservationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HotelRoomReservationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.hotelRoomReservation).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
