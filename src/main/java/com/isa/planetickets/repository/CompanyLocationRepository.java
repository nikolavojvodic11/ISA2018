package com.isa.planetickets.repository;

import com.isa.planetickets.domain.CompanyLocation;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CompanyLocation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompanyLocationRepository extends JpaRepository<CompanyLocation, Long> {
	
	List<CompanyLocation> findByCompanyId(Long companyId);

	List<CompanyLocation> findByDeleted(Boolean deleted);
	
	List<CompanyLocation> findByCompanyIdAndDeleted(Long companyId, Boolean deleted);
}
