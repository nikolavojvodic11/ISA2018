import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFriendRequest } from 'app/shared/model/friend-request.model';
import { FriendRequestService } from './friend-request.service';
import { IIsaUser } from 'app/shared/model/isa-user.model';
import { IsaUserService } from 'app/entities/isa-user';

@Component({
    selector: 'jhi-friend-request-update',
    templateUrl: './friend-request-update.component.html'
})
export class FriendRequestUpdateComponent implements OnInit {
    friendRequest: IFriendRequest;
    isSaving: boolean;

    isausers: IIsaUser[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected friendRequestService: FriendRequestService,
        protected isaUserService: IsaUserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ friendRequest }) => {
            this.friendRequest = friendRequest;
        });
        this.isaUserService.query().subscribe(
            (res: HttpResponse<IIsaUser[]>) => {
                this.isausers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.friendRequest.id !== undefined) {
            this.subscribeToSaveResponse(this.friendRequestService.update(this.friendRequest));
        } else {
            this.subscribeToSaveResponse(this.friendRequestService.create(this.friendRequest));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFriendRequest>>) {
        result.subscribe((res: HttpResponse<IFriendRequest>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackIsaUserById(index: number, item: IIsaUser) {
        return item.id;
    }
}
