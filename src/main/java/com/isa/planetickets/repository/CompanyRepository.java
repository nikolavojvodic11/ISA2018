package com.isa.planetickets.repository;

import com.isa.planetickets.domain.Company;
import com.isa.planetickets.domain.CompanyLocation;
import com.isa.planetickets.domain.enumeration.CompanyType;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Company entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
	List<Company> findByType(CompanyType type);
}
