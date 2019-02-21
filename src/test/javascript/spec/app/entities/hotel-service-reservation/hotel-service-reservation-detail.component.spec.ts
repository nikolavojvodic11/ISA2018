/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlaneTicketsTestModule } from '../../../test.module';
import { HotelServiceReservationDetailComponent } from 'app/entities/hotel-service-reservation/hotel-service-reservation-detail.component';
import { HotelServiceReservation } from 'app/shared/model/hotel-service-reservation.model';

describe('Component Tests', () => {
    describe('HotelServiceReservation Management Detail Component', () => {
        let comp: HotelServiceReservationDetailComponent;
        let fixture: ComponentFixture<HotelServiceReservationDetailComponent>;
        const route = ({ data: of({ hotelServiceReservation: new HotelServiceReservation(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [HotelServiceReservationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HotelServiceReservationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HotelServiceReservationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.hotelServiceReservation).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
