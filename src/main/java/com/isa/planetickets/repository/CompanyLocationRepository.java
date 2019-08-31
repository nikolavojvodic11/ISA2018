package com.isa.planetickets.repository;

import com.isa.planetickets.domain.CompanyLocation;
import com.isa.planetickets.domain.Hotel;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;


/**
 * Spring Data  repository for the CompanyLocation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompanyLocationRepository extends JpaRepository<CompanyLocation, Long> {
	
	List<CompanyLocation> findByCompanyId(Long companyId);

	List<CompanyLocation> findByDeleted(Boolean deleted);
	
	List<CompanyLocation> findByCompanyIdAndDeleted(Long companyId, Boolean deleted);
	
	@Query("SELECT cl FROM CompanyLocation cl "
			+ "WHERE cl.city.id = :cityId "
			+ "AND cl.company.id = :companyId "
			+ "AND cl.deleted = false")
    public List<CompanyLocation> findByCityAndCompany(@Param("cityId") Long cityId, @Param("companyId") Long companyId);
	
	@Query("SELECT cl FROM CompanyLocation cl "
			+ "WHERE cl.city.id = :cityId "
			+ "AND cl.deleted = false")
    public List<CompanyLocation> findByCity(@Param("cityId") Long cityId);
	
	@Query("SELECT cl FROM CompanyLocation cl "
			+ "WHERE cl.company.id = :companyId "
			+ "AND cl.deleted = false")
    public List<CompanyLocation> findByCompany(@Param("companyId") Long companyId);
}
