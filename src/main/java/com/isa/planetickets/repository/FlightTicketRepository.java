package com.isa.planetickets.repository;

import com.isa.planetickets.domain.FlightTicket;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FlightTicket entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FlightTicketRepository extends JpaRepository<FlightTicket, Long> {

}
