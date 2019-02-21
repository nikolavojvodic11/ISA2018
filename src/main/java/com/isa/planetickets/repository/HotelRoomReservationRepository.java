package com.isa.planetickets.repository;

import com.isa.planetickets.domain.HotelRoomReservation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the HotelRoomReservation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HotelRoomReservationRepository extends JpaRepository<HotelRoomReservation, Long> {

}
