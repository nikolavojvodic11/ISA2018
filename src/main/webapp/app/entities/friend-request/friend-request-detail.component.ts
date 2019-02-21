import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFriendRequest } from 'app/shared/model/friend-request.model';

@Component({
    selector: 'jhi-friend-request-detail',
    templateUrl: './friend-request-detail.component.html'
})
export class FriendRequestDetailComponent implements OnInit {
    friendRequest: IFriendRequest;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ friendRequest }) => {
            this.friendRequest = friendRequest;
        });
    }

    previousState() {
        window.history.back();
    }
}
