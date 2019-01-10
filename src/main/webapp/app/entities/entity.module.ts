import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PlaneTicketsIsaUserModule } from './isa-user/isa-user.module';
import { PlaneTicketsCityModule } from './city/city.module';
import { PlaneTicketsCompanyTypeModule } from './company-type/company-type.module';
import { PlaneTicketsCompanyModule } from './company/company.module';
import { PlaneTicketsCompanyLocationModule } from './company-location/company-location.module';
import { PlaneTicketsAirportModule } from './airport/airport.module';
import { PlaneTicketsFlightModule } from './flight/flight.module';
import { PlaneTicketsPlaneModule } from './plane/plane.module';
import { PlaneTicketsFlightStopModule } from './flight-stop/flight-stop.module';
import { PlaneTicketsFlightTicketModule } from './flight-ticket/flight-ticket.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        PlaneTicketsIsaUserModule,
        PlaneTicketsCityModule,
        PlaneTicketsCompanyTypeModule,
        PlaneTicketsCompanyModule,
        PlaneTicketsCompanyLocationModule,
        PlaneTicketsAirportModule,
        PlaneTicketsFlightModule,
        PlaneTicketsPlaneModule,
        PlaneTicketsFlightStopModule,
        PlaneTicketsFlightTicketModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaneTicketsEntityModule {}
