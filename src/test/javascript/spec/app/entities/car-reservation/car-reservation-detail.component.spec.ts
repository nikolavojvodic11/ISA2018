/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlaneTicketsTestModule } from '../../../test.module';
import { CarReservationDetailComponent } from 'app/entities/car-reservation/car-reservation-detail.component';
import { CarReservation } from 'app/shared/model/car-reservation.model';

describe('Component Tests', () => {
    describe('CarReservation Management Detail Component', () => {
        let comp: CarReservationDetailComponent;
        let fixture: ComponentFixture<CarReservationDetailComponent>;
        const route = ({ data: of({ carReservation: new CarReservation(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [CarReservationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CarReservationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CarReservationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.carReservation).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
