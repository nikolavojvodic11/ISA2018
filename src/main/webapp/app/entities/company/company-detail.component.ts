import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompany } from 'app/shared/model/company.model';
import { IFlight } from '../../shared/model/flight.model';
import { IPlane } from '../../shared/model/plane.model';
import { FlightService } from '../flight';
import { PlaneService } from '../plane';
import { JhiAlertService } from 'ng-jhipster';
import { ICar } from '../../shared/model/car.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-company-detail',
    templateUrl: './company-detail.component.html'
})
export class CompanyDetailComponent implements OnInit {
    company: ICompany;
    flights: IFlight[];
    planes: IPlane[];

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected flightService: FlightService,
        protected planeService: PlaneService,
        protected jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ company }) => {
            this.company = company;

            this.getCompanyPlanes();
            this.getCompanyFlights();
        });
    }

    getCompanyPlanes() {
        this.planeService.findByCompanyId(this.company.id).subscribe(
            (res: HttpResponse<IPlane[]>) => {
                this.planes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    getCompanyFlights() {
        this.flightService.findByCompanyId(this.company.id).subscribe(
            (res: HttpResponse<IFlight[]>) => {
                this.flights = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    previousState() {
        window.history.back();
    }
}
