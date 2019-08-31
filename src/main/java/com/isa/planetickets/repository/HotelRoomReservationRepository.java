package com.isa.planetickets.repository;

import com.isa.planetickets.domain.Flight;
import com.isa.planetickets.domain.HotelRoomReservation;

import java.time.Instant;
import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the HotelRoomReservation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HotelRoomReservationRepository extends JpaRepository<HotelRoomReservation, Long> {
	
	@Query("SELECT r FROM HotelRoomReservation r "
			+ "WHERE ((r.dateFrom <= :checkInDate AND r.dateTo >= :checkInDate) "
			+ "		OR (r.dateFrom <= :checkOutDate AND r.dateTo >= :checkOutDate)) "
			+ "AND r.room.hotel.id = :hotelId "
			+ "AND r.deleted = false "
			+ "AND r.status != 'DELETED'"
			)
    public List<HotelRoomReservation> findByHotelIdAndReserved(
    		@Param("hotelId") Long hotelId,
    		@Param("checkInDate") Instant checkInDate,
    		@Param("checkOutDate") Instant checkOutDate
    		);
}
