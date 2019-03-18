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
            adultsCount: '1',
            depatureAirport: null,
            arrivalAirport: null,
            departureDate: null,
            arrivalDate: null
        };
    }

    ngOnInit() {}

    search() {
        console.warn('Send search flights request');
        console.warn('Search data', this.formData);
    }
}
