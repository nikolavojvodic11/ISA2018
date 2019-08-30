package com.isa.planetickets.repository;

import com.isa.planetickets.domain.Car;
import com.isa.planetickets.domain.Flight;

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
}
