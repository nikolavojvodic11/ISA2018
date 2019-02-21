import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlaneTicketsSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent, FlightTabComponent } from './';

@NgModule({
    imports: [PlaneTicketsSharedModule, RouterModule.forChild([HOME_ROUTE])],
    declarations: [HomeComponent, FlightTabComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaneTicketsHomeModule {}
