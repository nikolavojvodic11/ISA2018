import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRoomPricelist } from 'app/shared/model/room-pricelist.model';

@Component({
    selector: 'jhi-room-pricelist-detail',
    templateUrl: './room-pricelist-detail.component.html'
})
export class RoomPricelistDetailComponent implements OnInit {
    roomPricelist: IRoomPricelist;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ roomPricelist }) => {
            this.roomPricelist = roomPricelist;
        });
    }

    previousState() {
        window.history.back();
    }
}
