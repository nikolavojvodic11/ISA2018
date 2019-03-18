import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlaneTicketsSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { ComponentsModule } from 'app/components/components.module';

@NgModule({
    imports: [PlaneTicketsSharedModule, ComponentsModule, RouterModule.forChild([HOME_ROUTE])],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaneTicketsHomeModule {}
