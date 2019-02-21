/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PlaneTicketsTestModule } from '../../../test.module';
import { FriendRequestUpdateComponent } from 'app/entities/friend-request/friend-request-update.component';
import { FriendRequestService } from 'app/entities/friend-request/friend-request.service';
import { FriendRequest } from 'app/shared/model/friend-request.model';

describe('Component Tests', () => {
    describe('FriendRequest Management Update Component', () => {
        let comp: FriendRequestUpdateComponent;
        let fixture: ComponentFixture<FriendRequestUpdateComponent>;
        let service: FriendRequestService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [FriendRequestUpdateComponent]
            })
                .overrideTemplate(FriendRequestUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FriendRequestUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FriendRequestService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new FriendRequest(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.friendRequest = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new FriendRequest();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.friendRequest = entity;
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
