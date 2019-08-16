import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PlaneTicketsIsaUserModule } from './isa-user/isa-user.module';
import { PlaneTicketsCityModule } from './city/city.module';
import { PlaneTicketsCompanyModule } from './company/company.module';
import { PlaneTicketsCompanyLocationModule } from './company-location/company-location.module';
import { PlaneTicketsAirportModule } from './airport/airport.module';
import { PlaneTicketsFlightModule } from './flight/flight.module';
import { PlaneTicketsPlaneModule } from './plane/plane.module';
import { PlaneTicketsCarModule } from './car/car.module';
import { PlaneTicketsHotelModule } from './hotel/hotel.module';
import { PlaneTicketsRoomModule } from './room/room.module';
import { PlaneTicketsRoomPricelistModule } from './room-pricelist/room-pricelist.module';
import { PlaneTicketsReservationModule } from './reservation/reservation.module';
import { PlaneTicketsFriendRequestModule } from './friend-request/friend-request.module';
import { PlaneTicketsImageModule } from './image/image.module';
import { PlaneTicketsHotelServiceModule } from './hotel-service/hotel-service.module';
import { PlaneTicketsAvailableHotelServiceModule } from './available-hotel-service/available-hotel-service.module';
import { PlaneTicketsHotelServiceReservationModule } from './hotel-service-reservation/hotel-service-reservation.module';
import { PlaneTicketsHotelRoomReservationModule } from './hotel-room-reservation/hotel-room-reservation.module';
import { PlaneTicketsFlightSeatReservationModule } from './flight-seat-reservation/flight-seat-reservation.module';
import { PlaneTicketsCarReservationModule } from './car-reservation/car-reservation.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        PlaneTicketsIsaUserModule,
        PlaneTicketsCityModule,
        PlaneTicketsCompanyModule,
        PlaneTicketsCompanyLocationModule,
        PlaneTicketsAirportModule,
        PlaneTicketsFlightModule,
        PlaneTicketsPlaneModule,
        PlaneTicketsCarModule,
        PlaneTicketsHotelModule,
        PlaneTicketsRoomModule,
        PlaneTicketsRoomPricelistModule,
        PlaneTicketsReservationModule,
        PlaneTicketsFriendRequestModule,
        PlaneTicketsImageModule,
        PlaneTicketsHotelServiceModule,
        PlaneTicketsAvailableHotelServiceModule,
        PlaneTicketsHotelServiceReservationModule,
        PlaneTicketsHotelRoomReservationModule,
        PlaneTicketsFlightSeatReservationModule,
        PlaneTicketsCarReservationModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaneTicketsEntityModule {}
