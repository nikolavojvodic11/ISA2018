/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PlaneTicketsTestModule } from '../../../test.module';
import { FriendRequestComponent } from 'app/entities/friend-request/friend-request.component';
import { FriendRequestService } from 'app/entities/friend-request/friend-request.service';
import { FriendRequest } from 'app/shared/model/friend-request.model';

describe('Component Tests', () => {
    describe('FriendRequest Management Component', () => {
        let comp: FriendRequestComponent;
        let fixture: ComponentFixture<FriendRequestComponent>;
        let service: FriendRequestService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [FriendRequestComponent],
                providers: []
            })
                .overrideTemplate(FriendRequestComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FriendRequestComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FriendRequestService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FriendRequest(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.friendRequests[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
