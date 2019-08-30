package com.isa.planetickets.repository;

import com.isa.planetickets.domain.FlightSeatReservation;
import com.isa.planetickets.domain.IsaUser;
import com.isa.planetickets.domain.enumeration.ReservationStatus;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FlightSeatReservation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FlightSeatReservationRepository extends JpaRepository<FlightSeatReservation, Long> {
	public List<FlightSeatReservation> findByFlightIdAndDeleted(Long flightId, Boolean deleted);
}
