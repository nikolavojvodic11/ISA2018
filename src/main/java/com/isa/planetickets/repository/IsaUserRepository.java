package com.isa.planetickets.repository;

import com.isa.planetickets.domain.Car;
import com.isa.planetickets.domain.Flight;
import com.isa.planetickets.domain.IsaUser;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the IsaUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IsaUserRepository extends JpaRepository<IsaUser, Long> {
	public IsaUser findByJhiUserId(Long userId);
}
