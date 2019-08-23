package com.isa.planetickets.repository;

import com.isa.planetickets.domain.Car;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Car entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
	
    List<Car> findByCompanyLocationId(Long companyLocationId);
	
    List<Car> findByDeleted(Boolean deleted);
	
    List<Car> findByCompanyLocationIdAndDeleted(Long companyLocationId, Boolean deleted);
}
