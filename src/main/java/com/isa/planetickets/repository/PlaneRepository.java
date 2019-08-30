package com.isa.planetickets.repository;

import com.isa.planetickets.domain.Plane;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Plane entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlaneRepository extends JpaRepository<Plane, Long> {
	 
	List<Plane> findByCompanyIdAndDeleted(Long companyId, Boolean deleted);
	
	List<Plane> findByCompanyId(Long companyId);
}
