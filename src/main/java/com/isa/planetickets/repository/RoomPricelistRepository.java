package com.isa.planetickets.repository;

import com.isa.planetickets.domain.RoomPricelist;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RoomPricelist entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoomPricelistRepository extends JpaRepository<RoomPricelist, Long> {

}
