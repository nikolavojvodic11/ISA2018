package com.isa.planetickets.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.isa.planetickets.domain.HotelRoomReservation;
import com.isa.planetickets.domain.Room;
import com.isa.planetickets.repository.HotelRoomReservationRepository;
import com.isa.planetickets.web.rest.errors.BadRequestAlertException;
import com.isa.planetickets.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing HotelRoomReservation.
 */
@RestController
@RequestMapping("/api")
public class HotelRoomReservationResource {

    private final Logger log = LoggerFactory.getLogger(HotelRoomReservationResource.class);

    private static final String ENTITY_NAME = "hotelRoomReservation";

    private final HotelRoomReservationRepository hotelRoomReservationRepository;

    public HotelRoomReservationResource(HotelRoomReservationRepository hotelRoomReservationRepository) {
        this.hotelRoomReservationRepository = hotelRoomReservationRepository;
    }

    /**
     * POST  /hotel-room-reservations : Create a new hotelRoomReservation.
     *
     * @param hotelRoomReservation the hotelRoomReservation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new hotelRoomReservation, or with status 400 (Bad Request) if the hotelRoomReservation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/hotel-room-reservations")
    @Timed
    public ResponseEntity<HotelRoomReservation> createHotelRoomReservation(@RequestBody HotelRoomReservation hotelRoomReservation) throws URISyntaxException {
        log.debug("REST request to save HotelRoomReservation : {}", hotelRoomReservation);
        if (hotelRoomReservation.getId() != null) {
            throw new BadRequestAlertException("A new hotelRoomReservation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HotelRoomReservation result = hotelRoomReservationRepository.save(hotelRoomReservation);
        return ResponseEntity.created(new URI("/api/hotel-room-reservations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /hotel-room-reservations : Updates an existing hotelRoomReservation.
     *
     * @param hotelRoomReservation the hotelRoomReservation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated hotelRoomReservation,
     * or with status 400 (Bad Request) if the hotelRoomReservation is not valid,
     * or with status 500 (Internal Server Error) if the hotelRoomReservation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/hotel-room-reservations")
    @Timed
    public ResponseEntity<HotelRoomReservation> updateHotelRoomReservation(@RequestBody HotelRoomReservation hotelRoomReservation) throws URISyntaxException {
        log.debug("REST request to update HotelRoomReservation : {}", hotelRoomReservation);
        if (hotelRoomReservation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HotelRoomReservation result = hotelRoomReservationRepository.save(hotelRoomReservation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, hotelRoomReservation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /hotel-room-reservations : get all the hotelRoomReservations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of hotelRoomReservations in body
     */
    @GetMapping("/hotel-room-reservations")
    @Timed
    public List<HotelRoomReservation> getAllHotelRoomReservations() {
        log.debug("REST request to get all HotelRoomReservations");
        return hotelRoomReservationRepository.findAll();
    }
    
    /**
     * GET  /roomsByHotelId/{hotelId} : get all the rooms by hotel id.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of rooms in body
     */
    @GetMapping("/roomReservationsByHotelId/{hotelId}")
    @Timed
    public List<HotelRoomReservation> getRoomReservationsByHotelId(
    		@PathVariable Long hotelId,
    		@RequestParam(name = "checkInDate", required = false) String checkInDate,
    		@RequestParam(name = "checkOutDate", required = false) String checkOutDate
    		) {
    	Instant dateFrom = LocalDate.parse(checkInDate.substring(0,10)).atStartOfDay(ZoneOffset.UTC).toInstant();
    	Instant dateTo = LocalDate.parse(checkOutDate.substring(0,10)).atStartOfDay(ZoneOffset.UTC).toInstant();
    	return hotelRoomReservationRepository.findByHotelIdAndReserved(hotelId, dateFrom, dateTo);
    }

    /**
     * GET  /hotel-room-reservations/:id : get the "id" hotelRoomReservation.
     *
     * @param id the id of the hotelRoomReservation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the hotelRoomReservation, or with status 404 (Not Found)
     */
    @GetMapping("/hotel-room-reservations/{id}")
    @Timed
    public ResponseEntity<HotelRoomReservation> getHotelRoomReservation(@PathVariable Long id) {
        log.debug("REST request to get HotelRoomReservation : {}", id);
        Optional<HotelRoomReservation> hotelRoomReservation = hotelRoomReservationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(hotelRoomReservation);
    }

    /**
     * DELETE  /hotel-room-reservations/:id : delete the "id" hotelRoomReservation.
     *
     * @param id the id of the hotelRoomReservation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/hotel-room-reservations/{id}")
    @Timed
    public ResponseEntity<Void> deleteHotelRoomReservation(@PathVariable Long id) {
        log.debug("REST request to delete HotelRoomReservation : {}", id);

        hotelRoomReservationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
