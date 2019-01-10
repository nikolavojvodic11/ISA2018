import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlane } from 'app/shared/model/plane.model';

@Component({
    selector: 'jhi-plane-detail',
    templateUrl: './plane-detail.component.html'
})
export class PlaneDetailComponent implements OnInit {
    plane: IPlane;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ plane }) => {
            this.plane = plane;
        });
    }

    previousState() {
        window.history.back();
    }
}
