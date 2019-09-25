import { Component, OnInit } from '@angular/core';
import { FriendRequestService } from '../../entities/friend-request';
import { FriendRequest, IFriendRequest } from '../../shared/model/friend-request.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiAlertComponent } from '../../shared';
import { JhiAlertService } from 'ng-jhipster';
import { AccountService, IUser, UserService } from '../../core';
import { IsaUserService } from '../../entities/isa-user';
import { IIsaUser } from '../../shared/model/isa-user.model';

@Component({
    selector: 'jhi-friends',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.css']
})
export class FriendsComponent implements OnInit {
    users: IUser[] = [];
    otherUsers: IUser[] = [];
    friends: IFriendRequest[] = [];
    pendingRequests: IFriendRequest[] = [];
    user: IIsaUser;
    dataLoaded: boolean = false;

    constructor(
        protected friendRequestService: FriendRequestService,
        protected accountService: AccountService,
        protected isaUserService: IsaUserService,
        protected jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.isaUserService.query({ jhiUserId: account.id }).subscribe(
                (res: HttpResponse<IIsaUser[]>) => {
                    if (res.body.length > 0) {
                        this.user = res.body[0];
                        this.getUsersData();
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        });
    }

    getUsersData() {
        this.dataLoaded = false;
        this.getUserFriends();
    }

    getUserFriends() {
        this.friendRequestService.getCurrentUserFriends().subscribe(
            (res: HttpResponse<IFriendRequest[]>) => {
                this.friends = res.body;
                console.log('friends', this.friends);
                this.getUserRequests();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    getUserRequests() {
        this.friendRequestService.getCurrentUserRequests().subscribe(
            (res: HttpResponse<IFriendRequest[]>) => {
                this.pendingRequests = res.body;
                console.log('pending', this.pendingRequests);
                this.getUsers();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    getUsers() {
        this.isaUserService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
                this.getOtherUsers();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    sendFriendRequest(user) {
        let req = new FriendRequest();
        req.deleted = false;
        req.reciver = user;
        req.sender = this.user;

        this.friendRequestService.create(req).subscribe(
            (res: HttpResponse<IFriendRequest>) => {
                alert('Friend request sent to ' + user.jhiUser.firstName + ' ' + user.jhiUser.lastName);
                this.getUsersData();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    cancelFriendRequest(req) {
        req['deleted'] = true;
        this.friendRequestService.update(req).subscribe(
            (res: HttpResponse<IFriendRequest>) => {
                this.getUsersData();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    acceptFriendRequest(req) {
        req['accepted'] = true;
        this.friendRequestService.update(req).subscribe(
            (res: HttpResponse<IFriendRequest>) => {
                this.getUsersData();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    denyFriendRequest(req) {
        req['deleted'] = true;
        req['accepted'] = false;
        this.friendRequestService.update(req).subscribe(
            (res: HttpResponse<IFriendRequest>) => {
                this.getUsersData();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    isFriend(userId) {
        for (let req of this.friends) {
            console.log(req.sender, req.reciver, userId);
            if (req.sender.id === userId || req.reciver.id === userId) {
                console.log('IS FRIEND');
                return true;
            }
        }
        return false;
    }

    isRequestPending(userId) {
        for (let req of this.pendingRequests) {
            if (req.sender.id === userId || req.reciver.id === userId) {
                console.log('IS PENDING');
                return true;
            }
        }
        return false;
    }

    getOtherUsers() {
        let result = [];

        for (let user of this.users) {
            if (this.user.id !== user.id && !this.isFriend(user.id) && !this.isRequestPending(user.id)) {
                console.log('LOL');
                result.push(user);
            }
        }

        this.otherUsers = result;
        this.dataLoaded = true;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
