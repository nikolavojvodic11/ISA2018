/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PlaneTicketsTestModule } from '../../../test.module';
import { FlightTicketUpdateComponent } from 'app/entities/flight-ticket/flight-ticket-update.component';
import { FlightTicketService } from 'app/entities/flight-ticket/flight-ticket.service';
import { FlightTicket } from 'app/shared/model/flight-ticket.model';

describe('Component Tests', () => {
    describe('FlightTicket Management Update Component', () => {
        let comp: FlightTicketUpdateComponent;
        let fixture: ComponentFixture<FlightTicketUpdateComponent>;
        let service: FlightTicketService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [FlightTicketUpdateComponent]
            })
                .overrideTemplate(FlightTicketUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FlightTicketUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlightTicketService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new FlightTicket(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.flightTicket = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new FlightTicket();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.flightTicket = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
