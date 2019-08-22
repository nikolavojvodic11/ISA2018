import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaneTicketsSharedModule } from 'app/shared';

import { FlightsTabComponent } from './homeTabs/flights-tab/flights-tab.component';
import { FlightsTabSearchComponent } from './homeTabs/flights-tab/flights-tab-search.component';
import { FlightsTabPreviewComponent } from './homeTabs/flights-tab/flights-tab-preview.component';
import { FlightsTabSeatsComponent } from './homeTabs/flights-tab/flights-tab-seats.component';
import { FlightsTabInviteComponent } from './homeTabs/flights-tab/flights-tab-invite.component';
import { FlightsTabPassengersComponent } from './homeTabs/flights-tab/flights-tab-passengers.component';

import { HotelsTabComponent } from './homeTabs/hotels-tab/hotels-tab.component';

import { CarRentalsTabComponent } from './homeTabs/car-rentals-tab/car-rentals-tab.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        FlightsTabComponent,
        FlightsTabSearchComponent,
        FlightsTabPreviewComponent,
        FlightsTabSeatsComponent,
        FlightsTabInviteComponent,
        FlightsTabPassengersComponent,
        HotelsTabComponent,
        CarRentalsTabComponent
    ],
    imports: [CommonModule, RouterModule, PlaneTicketsSharedModule],
    exports: [FlightsTabComponent, HotelsTabComponent, CarRentalsTabComponent]
})
export class ComponentsModule {}
