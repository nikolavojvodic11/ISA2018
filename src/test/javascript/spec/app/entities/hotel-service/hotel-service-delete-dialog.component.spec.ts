/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PlaneTicketsTestModule } from '../../../test.module';
import { HotelServiceDeleteDialogComponent } from 'app/entities/hotel-service/hotel-service-delete-dialog.component';
import { HotelServiceService } from 'app/entities/hotel-service/hotel-service.service';

describe('Component Tests', () => {
    describe('HotelService Management Delete Component', () => {
        let comp: HotelServiceDeleteDialogComponent;
        let fixture: ComponentFixture<HotelServiceDeleteDialogComponent>;
        let service: HotelServiceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [HotelServiceDeleteDialogComponent]
            })
                .overrideTemplate(HotelServiceDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HotelServiceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HotelServiceService);
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
