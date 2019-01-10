/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PlaneTicketsTestModule } from '../../../test.module';
import { FlightTicketComponent } from 'app/entities/flight-ticket/flight-ticket.component';
import { FlightTicketService } from 'app/entities/flight-ticket/flight-ticket.service';
import { FlightTicket } from 'app/shared/model/flight-ticket.model';

describe('Component Tests', () => {
    describe('FlightTicket Management Component', () => {
        let comp: FlightTicketComponent;
        let fixture: ComponentFixture<FlightTicketComponent>;
        let service: FlightTicketService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [FlightTicketComponent],
                providers: []
            })
                .overrideTemplate(FlightTicketComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FlightTicketComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlightTicketService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FlightTicket(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.flightTickets[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
