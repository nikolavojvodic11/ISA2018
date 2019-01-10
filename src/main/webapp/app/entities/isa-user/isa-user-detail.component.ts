import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIsaUser } from 'app/shared/model/isa-user.model';

@Component({
    selector: 'jhi-isa-user-detail',
    templateUrl: './isa-user-detail.component.html'
})
export class IsaUserDetailComponent implements OnInit {
    isaUser: IIsaUser;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ isaUser }) => {
            this.isaUser = isaUser;
        });
    }

    previousState() {
        window.history.back();
    }
}
