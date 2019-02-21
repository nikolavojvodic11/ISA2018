package com.isa.planetickets.repository;

import com.isa.planetickets.domain.AvailableHotelService;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AvailableHotelService entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AvailableHotelServiceRepository extends JpaRepository<AvailableHotelService, Long> {

}
