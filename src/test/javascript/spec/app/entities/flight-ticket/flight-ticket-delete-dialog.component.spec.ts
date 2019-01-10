/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PlaneTicketsTestModule } from '../../../test.module';
import { FlightTicketDeleteDialogComponent } from 'app/entities/flight-ticket/flight-ticket-delete-dialog.component';
import { FlightTicketService } from 'app/entities/flight-ticket/flight-ticket.service';

describe('Component Tests', () => {
    describe('FlightTicket Management Delete Component', () => {
        let comp: FlightTicketDeleteDialogComponent;
        let fixture: ComponentFixture<FlightTicketDeleteDialogComponent>;
        let service: FlightTicketService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [FlightTicketDeleteDialogComponent]
            })
                .overrideTemplate(FlightTicketDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FlightTicketDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlightTicketService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
