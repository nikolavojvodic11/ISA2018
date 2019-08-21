import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-flights-tab-search',
    templateUrl: './flights-tab-search.component.html',
    styles: []
})
export class FlightsTabSearchComponent implements OnInit {
    formData: Object;

    constructor() {
        this.formData = {
            adultsCount: null,
            flightType: null,
            flightClass: null,
            departureDate: new Date().toISOString(),
            arrivalDate: new Date().toISOString(),
            departureAirport: null,
            arrivalAirport: null
        };
    }

    ngOnInit() {}

    search() {
        // console.error('Form data', this.formData);
    }
}
