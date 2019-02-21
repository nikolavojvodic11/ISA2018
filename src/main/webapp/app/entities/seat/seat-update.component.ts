import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISeat } from 'app/shared/model/seat.model';
import { SeatService } from './seat.service';
import { IPlane } from 'app/shared/model/plane.model';
import { PlaneService } from 'app/entities/plane';

@Component({
    selector: 'jhi-seat-update',
    templateUrl: './seat-update.component.html'
})
export class SeatUpdateComponent implements OnInit {
    seat: ISeat;
    isSaving: boolean;

    planes: IPlane[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected seatService: SeatService,
        protected planeService: PlaneService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ seat }) => {
            this.seat = seat;
        });
        this.planeService.query().subscribe(
            (res: HttpResponse<IPlane[]>) => {
                this.planes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.seat.id !== undefined) {
            this.subscribeToSaveResponse(this.seatService.update(this.seat));
        } else {
            this.subscribeToSaveResponse(this.seatService.create(this.seat));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISeat>>) {
        result.subscribe((res: HttpResponse<ISeat>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPlaneById(index: number, item: IPlane) {
        return item.id;
    }
}
