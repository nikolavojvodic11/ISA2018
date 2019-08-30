package com.isa.planetickets.repository;

import com.isa.planetickets.domain.Flight;
import com.isa.planetickets.domain.FlightSeatReservation;
import com.isa.planetickets.domain.FriendRequest;

import java.time.Instant;
import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FriendRequest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {

	@Query("SELECT f FROM FriendRequest f "
			+ "WHERE (f.sender.id = :userId OR f.reciver.id = :userId)"
			+ "AND f.accepted = true "
			+ "AND f.deleted = false"
			)
    public List<FriendRequest> getUserFriends(
    		@Param("userId") Long userId
    		);
}
