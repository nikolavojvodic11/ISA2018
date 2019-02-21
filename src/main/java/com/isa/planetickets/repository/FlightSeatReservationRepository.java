package com.isa.planetickets.repository;

import com.isa.planetickets.domain.FlightSeatReservation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FlightSeatReservation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FlightSeatReservationRepository extends JpaRepository<FlightSeatReservation, Long> {

}
