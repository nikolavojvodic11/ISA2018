package com.isa.planetickets.repository;

import com.isa.planetickets.domain.HotelService;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the HotelService entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HotelServiceRepository extends JpaRepository<HotelService, Long> {

}
