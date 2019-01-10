package com.isa.planetickets.repository;

import com.isa.planetickets.domain.FlightStop;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FlightStop entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FlightStopRepository extends JpaRepository<FlightStop, Long> {

}
