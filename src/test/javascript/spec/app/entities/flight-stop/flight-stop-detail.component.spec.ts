/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlaneTicketsTestModule } from '../../../test.module';
import { FlightStopDetailComponent } from 'app/entities/flight-stop/flight-stop-detail.component';
import { FlightStop } from 'app/shared/model/flight-stop.model';

describe('Component Tests', () => {
    describe('FlightStop Management Detail Component', () => {
        let comp: FlightStopDetailComponent;
        let fixture: ComponentFixture<FlightStopDetailComponent>;
        const route = ({ data: of({ flightStop: new FlightStop(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [FlightStopDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FlightStopDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FlightStopDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.flightStop).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
