package com.isa.planetickets.repository;

import com.isa.planetickets.domain.Flight;
import com.isa.planetickets.domain.Hotel;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Hotel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {
	@Query("SELECT h FROM Hotel h "
			+ "INNER JOIN CompanyLocation cl ON h.companyLocation.id = cl.id WHERE cl.city.id = :cityId")
    public List<Hotel> findByCityId(@Param("cityId") Long cityId);
}
