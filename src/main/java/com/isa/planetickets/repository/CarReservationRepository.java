package com.isa.planetickets.repository;

import com.isa.planetickets.domain.CarReservation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CarReservation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CarReservationRepository extends JpaRepository<CarReservation, Long> {

}
