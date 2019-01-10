package com.isa.planetickets.repository;

import com.isa.planetickets.domain.IsaUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the IsaUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IsaUserRepository extends JpaRepository<IsaUser, Long> {

}
