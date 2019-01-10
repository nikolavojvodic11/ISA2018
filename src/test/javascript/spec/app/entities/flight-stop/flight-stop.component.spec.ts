/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PlaneTicketsTestModule } from '../../../test.module';
import { FlightStopComponent } from 'app/entities/flight-stop/flight-stop.component';
import { FlightStopService } from 'app/entities/flight-stop/flight-stop.service';
import { FlightStop } from 'app/shared/model/flight-stop.model';

describe('Component Tests', () => {
    describe('FlightStop Management Component', () => {
        let comp: FlightStopComponent;
        let fixture: ComponentFixture<FlightStopComponent>;
        let service: FlightStopService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [FlightStopComponent],
                providers: []
            })
                .overrideTemplate(FlightStopComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FlightStopComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlightStopService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FlightStop(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.flightStops[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
