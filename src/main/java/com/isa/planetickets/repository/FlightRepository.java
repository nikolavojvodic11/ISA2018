package com.isa.planetickets.repository;

import com.isa.planetickets.domain.Car;
import com.isa.planetickets.domain.Flight;

import java.time.Instant;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Flight entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {
	
	@Query("SELECT f FROM Flight f INNER JOIN Plane p ON f.plane.id = p.id WHERE p.company.id = :companyId")
    public List<Flight> findByCompanyId(@Param("companyId") Long companyId);
	
	@Query("SELECT f FROM Flight f "
			+ "WHERE f.arrivalAirport.id = :arrivalAirport "
			+ "AND f.departureAirport.id = :departureAirport "
			+ "AND f.departureTime > :departureDateFrom AND f.departureTime < :departureDateTo "
			+ "AND f.deleted = false"
			)
    public List<Flight> searchOneWay(
//    		@Param("adultsCount") Integer adultsCount,
    		@Param("arrivalAirport") Long arrivalAirport,
//    		@Param("arrivalDateFrom") Instant arrivalDateFrom,
//    		@Param("arrivalDateTo") Instant arrivalDateTo,
    		@Param("departureAirport") Long departureAirport,
    		@Param("departureDateFrom") Instant departureDateFrom,
    		@Param("departureDateTo") Instant departureDateTo
//    		@Param("flightClass") Integer flightClass,
//    		@Param("flightType") Integer flightType
    		);
	
	@Query("SELECT f FROM Flight f "
			+ "WHERE (f.arrivalAirport.id = :arrivalAirport AND f.departureAirport.id = :departureAirport "
			+ "		AND f.departureTime > :departureDateFrom AND f.departureTime < :departureDateTo"
			+ ") "
			+ "OR (f.arrivalAirport.id = :departureAirport AND f.departureAirport.id = :arrivalAirport "
			+ "		AND f.arrivalTime > :arrivalDateFrom AND f.arrivalTime < :arrivalDateTo"
			+ ") "
			+ "AND f.deleted = false"
			)
    public List<Flight> searchRoundTrip(
//    		@Param("adultsCount") Integer adultsCount,
    		@Param("arrivalAirport") Long arrivalAirport,
    		@Param("arrivalDateFrom") Instant arrivalDateFrom,
    		@Param("arrivalDateTo") Instant arrivalDateTo,
    		@Param("departureAirport") Long departureAirport,
    		@Param("departureDateFrom") Instant departureDateFrom,
    		@Param("departureDateTo") Instant departureDateTo
//    		@Param("flightClass") Integer flightClass,
//    		@Param("flightType") Integer flightType
    		);
}
