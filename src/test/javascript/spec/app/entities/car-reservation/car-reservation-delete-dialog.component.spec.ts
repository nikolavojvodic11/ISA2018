/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PlaneTicketsTestModule } from '../../../test.module';
import { CarReservationDeleteDialogComponent } from 'app/entities/car-reservation/car-reservation-delete-dialog.component';
import { CarReservationService } from 'app/entities/car-reservation/car-reservation.service';

describe('Component Tests', () => {
    describe('CarReservation Management Delete Component', () => {
        let comp: CarReservationDeleteDialogComponent;
        let fixture: ComponentFixture<CarReservationDeleteDialogComponent>;
        let service: CarReservationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [CarReservationDeleteDialogComponent]
            })
                .overrideTemplate(CarReservationDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CarReservationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CarReservationService);
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
