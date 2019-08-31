package com.isa.planetickets.repository;

import com.codahale.metrics.annotation.Timed;
import com.isa.planetickets.domain.CarReservation;
import com.isa.planetickets.domain.HotelRoomReservation;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


/**
 * Spring Data  repository for the CarReservation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CarReservationRepository extends JpaRepository<CarReservation, Long> {
	
	@Query("SELECT r FROM CarReservation r "
			+ "WHERE ((r.dateFrom <= :checkInDate AND r.dateTo >= :checkInDate) "
			+ "		OR (r.dateFrom <= :checkOutDate AND r.dateTo >= :checkOutDate)) "
			+ "AND r.car.companyLocation.id = :companyLocationId "
			+ "AND r.deleted = false "
			+ "AND r.status != 'DELETED'"
			)
    public List<CarReservation> findByCompanyLocationIdAndReserved(
    		@Param("companyLocationId") Long companyLocationId,
    		@Param("checkInDate") Instant checkInDate,
    		@Param("checkOutDate") Instant checkOutDate
    		);
}
