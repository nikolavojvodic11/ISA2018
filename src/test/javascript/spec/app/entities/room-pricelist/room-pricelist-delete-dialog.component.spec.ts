/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PlaneTicketsTestModule } from '../../../test.module';
import { RoomPricelistDeleteDialogComponent } from 'app/entities/room-pricelist/room-pricelist-delete-dialog.component';
import { RoomPricelistService } from 'app/entities/room-pricelist/room-pricelist.service';

describe('Component Tests', () => {
    describe('RoomPricelist Management Delete Component', () => {
        let comp: RoomPricelistDeleteDialogComponent;
        let fixture: ComponentFixture<RoomPricelistDeleteDialogComponent>;
        let service: RoomPricelistService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [RoomPricelistDeleteDialogComponent]
            })
                .overrideTemplate(RoomPricelistDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RoomPricelistDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoomPricelistService);
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
