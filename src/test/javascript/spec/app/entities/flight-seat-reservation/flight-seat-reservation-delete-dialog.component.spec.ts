/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PlaneTicketsTestModule } from '../../../test.module';
import { FlightSeatReservationDeleteDialogComponent } from 'app/entities/flight-seat-reservation/flight-seat-reservation-delete-dialog.component';
import { FlightSeatReservationService } from 'app/entities/flight-seat-reservation/flight-seat-reservation.service';

describe('Component Tests', () => {
    describe('FlightSeatReservation Management Delete Component', () => {
        let comp: FlightSeatReservationDeleteDialogComponent;
        let fixture: ComponentFixture<FlightSeatReservationDeleteDialogComponent>;
        let service: FlightSeatReservationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [FlightSeatReservationDeleteDialogComponent]
            })
                .overrideTemplate(FlightSeatReservationDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FlightSeatReservationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlightSeatReservationService);
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
