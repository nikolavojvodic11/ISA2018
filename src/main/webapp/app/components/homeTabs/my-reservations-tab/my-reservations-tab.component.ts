import { Component, OnInit } from '@angular/core';
import { JhiAlertService } from 'ng-jhipster';
import { IReservation } from '../../../shared/model/reservation.model';

@Component({
    selector: 'jhi-my-reservations-tab',
    templateUrl: './my-reservations-tab.component.html',
    styles: []
})
export class MyReservationsTabComponent implements OnInit {
    reservations: IReservation[];

    constructor(protected jhiAlertService: JhiAlertService) {
        // this.getHotels();
        console.error('AAAAAAAAAAAAAAAAAA');
    }

    ngOnInit() {}

    // getHotels() {
    //     this.hotelService.query().subscribe(
    //         (res: HttpResponse<IHotel[]>) => {
    //             this.hotels = res.body;
    //         },
    //         (res: HttpErrorResponse) => this.onError(res.message)
    //     );
    // }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
