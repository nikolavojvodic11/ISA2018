import { Component, OnInit } from '@angular/core';

import { FlightTabSteps } from 'app/constants/FlightTabSteps';

@Component({
    selector: 'jhi-flights-tab',
    templateUrl: './flights-tab.component.html',
    styles: []
})
export class FlightsTabComponent implements OnInit {
    currentStep: FlightTabSteps;

    constructor() {
        this.currentStep = FlightTabSteps.Search;
    }

    ngOnInit() {}
}
