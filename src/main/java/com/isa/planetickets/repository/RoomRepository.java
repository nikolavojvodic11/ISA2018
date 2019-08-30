package com.isa.planetickets.repository;

import com.isa.planetickets.domain.Car;
import com.isa.planetickets.domain.Room;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Room entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
	
	List<Room> findByHotelId(Long hotelId);
	
	//
	
	List<Room> findByHotelIdAndDeleted(Long hotelId, Boolean deleted);
}
