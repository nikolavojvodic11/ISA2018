package com.isa.planetickets.repository;

import com.isa.planetickets.domain.HotelServiceReservation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the HotelServiceReservation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HotelServiceReservationRepository extends JpaRepository<HotelServiceReservation, Long> {

}
