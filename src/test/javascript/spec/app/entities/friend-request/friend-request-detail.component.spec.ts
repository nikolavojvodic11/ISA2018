/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlaneTicketsTestModule } from '../../../test.module';
import { FriendRequestDetailComponent } from 'app/entities/friend-request/friend-request-detail.component';
import { FriendRequest } from 'app/shared/model/friend-request.model';

describe('Component Tests', () => {
    describe('FriendRequest Management Detail Component', () => {
        let comp: FriendRequestDetailComponent;
        let fixture: ComponentFixture<FriendRequestDetailComponent>;
        const route = ({ data: of({ friendRequest: new FriendRequest(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [FriendRequestDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FriendRequestDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FriendRequestDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.friendRequest).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
