/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlaneTicketsTestModule } from '../../../test.module';
import { FlightTicketDetailComponent } from 'app/entities/flight-ticket/flight-ticket-detail.component';
import { FlightTicket } from 'app/shared/model/flight-ticket.model';

describe('Component Tests', () => {
    describe('FlightTicket Management Detail Component', () => {
        let comp: FlightTicketDetailComponent;
        let fixture: ComponentFixture<FlightTicketDetailComponent>;
        const route = ({ data: of({ flightTicket: new FlightTicket(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [FlightTicketDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FlightTicketDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FlightTicketDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.flightTicket).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
