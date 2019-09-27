package com.isa.planetickets.repository;

import com.isa.planetickets.domain.FlightSeatReservation;
import com.isa.planetickets.domain.HotelRoomReservation;
import com.isa.planetickets.domain.IsaUser;
import com.isa.planetickets.domain.enumeration.ReservationStatus;

import java.time.Instant;
import java.util.List;

import javax.persistence.LockModeType;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;


/**
 * Spring Data  repository for the FlightSeatReservation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FlightSeatReservationRepository extends JpaRepository<FlightSeatReservation, Long> {
	
	@Transactional(isolation=Isolation.SERIALIZABLE)
	@Lock(LockModeType.PESSIMISTIC_WRITE)
	public List<FlightSeatReservation> findByFlightIdAndDeleted(Long flightId, Boolean deleted);

	@Transactional(isolation=Isolation.SERIALIZABLE)
	@Lock(LockModeType.PESSIMISTIC_WRITE)
	public <S extends FlightSeatReservation> S save(S entity);
	
	@Transactional(isolation=Isolation.SERIALIZABLE)
	@Lock(LockModeType.PESSIMISTIC_WRITE)
	@Query("SELECT r FROM FlightSeatReservation r "
			+ "WHERE r.flight.id = :flightId "
			+ "AND r.deleted = false "
			+ "AND r.seatRow = :seatRow "
			+ "AND r.seatCol = :seatCol "
			+ "AND ( r.status = 'CONFIRMED' "
			+ "OR r.status = 'RESERVED' )"
			)
    public List<FlightSeatReservation> isSeatTaken(
    		@Param("flightId") Long flightId,
    		@Param("seatRow") Integer seatRow,
    		@Param("seatCol") String seatCol
    		);
	
	
}
