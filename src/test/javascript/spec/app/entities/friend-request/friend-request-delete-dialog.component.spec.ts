/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PlaneTicketsTestModule } from '../../../test.module';
import { FriendRequestDeleteDialogComponent } from 'app/entities/friend-request/friend-request-delete-dialog.component';
import { FriendRequestService } from 'app/entities/friend-request/friend-request.service';

describe('Component Tests', () => {
    describe('FriendRequest Management Delete Component', () => {
        let comp: FriendRequestDeleteDialogComponent;
        let fixture: ComponentFixture<FriendRequestDeleteDialogComponent>;
        let service: FriendRequestService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [FriendRequestDeleteDialogComponent]
            })
                .overrideTemplate(FriendRequestDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FriendRequestDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FriendRequestService);
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
