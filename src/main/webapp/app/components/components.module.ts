import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaneTicketsSharedModule } from 'app/shared';

import { FlightsTabComponent } from './tabs/flights-tab/flights-tab.component';
import { FlightsTabSearchComponent } from './tabs/flights-tab/flights-tab-search.component';
import { FlightsTabPreviewComponent } from './tabs/flights-tab/flights-tab-preview.component';
import { FlightsTabSeatsComponent } from './tabs/flights-tab/flights-tab-seats.component';
import { FlightsTabInviteComponent } from './tabs/flights-tab/flights-tab-invite.component';
import { FlightsTabPassengersComponent } from './tabs/flights-tab/flights-tab-passengers.component';

import { HotelsTabComponent } from './tabs/hotels-tab/hotels-tab.component';

import { CarRentalTabComponent } from './tabs/car-rental-tab/car-rental-tab.component';

@NgModule({
    declarations: [
        FlightsTabComponent,
        FlightsTabSearchComponent,
        FlightsTabPreviewComponent,
        FlightsTabSeatsComponent,
        FlightsTabInviteComponent,
        FlightsTabPassengersComponent,
        HotelsTabComponent,
        CarRentalTabComponent
    ],
    imports: [CommonModule, PlaneTicketsSharedModule],
    exports: [FlightsTabComponent, HotelsTabComponent, CarRentalTabComponent]
})
export class ComponentsModule {}
