package com.isa.planetickets.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.isa.planetickets.domain.FlightSeatReservation;
import com.isa.planetickets.domain.enumeration.ReservationStatus;
import com.isa.planetickets.repository.FlightSeatReservationRepository;
import com.isa.planetickets.web.rest.errors.BadRequestAlertException;
import com.isa.planetickets.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing FlightSeatReservation.
 */
@RestController
@RequestMapping("/api")
public class FlightSeatReservationResource {

    private final Logger log = LoggerFactory.getLogger(FlightSeatReservationResource.class);

    private static final String ENTITY_NAME = "flightSeatReservation";

    private final FlightSeatReservationRepository flightSeatReservationRepository;

    public FlightSeatReservationResource(FlightSeatReservationRepository flightSeatReservationRepository) {
        this.flightSeatReservationRepository = flightSeatReservationRepository;
    }

    /**
     * POST  /flight-seat-reservations : Create a new flightSeatReservation.
     *
     * @param flightSeatReservation the flightSeatReservation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new flightSeatReservation, or with status 400 (Bad Request) if the flightSeatReservation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/flight-seat-reservations")
    @Timed
    public ResponseEntity<FlightSeatReservation> createFlightSeatReservation(@RequestBody FlightSeatReservation flightSeatReservation) throws URISyntaxException {
        log.debug("REST request to save FlightSeatReservation : {}", flightSeatReservation);
        if (flightSeatReservation.getId() != null) {
            throw new BadRequestAlertException("A new flightSeatReservation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (flightSeatReservation.getFlight() == null || flightSeatReservation.getSeatRow() == null || flightSeatReservation.getSeatCol() == null ) {
        	throw new BadRequestAlertException("Flight, Seat Row and Seat Col are required", ENTITY_NAME, "idexists");
        }
        if (flightSeatReservationRepository.isSeatTaken(flightSeatReservation.getFlight().getId(), flightSeatReservation.getSeatRow(), flightSeatReservation.getSeatCol()).size() > 0) {
        	throw new BadRequestAlertException("Seat is taken", ENTITY_NAME, "idexists");
        }
        FlightSeatReservation result = flightSeatReservationRepository.save(flightSeatReservation);
        return ResponseEntity.created(new URI("/api/flight-seat-reservations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /flight-seat-reservations : Updates an existing flightSeatReservation.
     *
     * @param flightSeatReservation the flightSeatReservation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated flightSeatReservation,
     * or with status 400 (Bad Request) if the flightSeatReservation is not valid,
     * or with status 500 (Internal Server Error) if the flightSeatReservation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/flight-seat-reservations")
    @Timed
    public ResponseEntity<FlightSeatReservation> updateFlightSeatReservation(@RequestBody FlightSeatReservation flightSeatReservation) throws URISyntaxException {
        log.debug("REST request to update FlightSeatReservation : {}", flightSeatReservation);
        if (flightSeatReservation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FlightSeatReservation result = flightSeatReservationRepository.save(flightSeatReservation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, flightSeatReservation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /flight-seat-reservations : get all the flightSeatReservations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of flightSeatReservations in body
     */
    @GetMapping("/flight-seat-reservations")
    @Timed
    public List<FlightSeatReservation> getAllFlightSeatReservations() {
        log.debug("REST request to get all FlightSeatReservations");
        return flightSeatReservationRepository.findAll();
    }

    /**
     * GET  /flight-seat-reservations/:id : get the "id" flightSeatReservation.
     *
     * @param id the id of the flightSeatReservation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the flightSeatReservation, or with status 404 (Not Found)
     */
    @GetMapping("/flight-seat-reservations/{id}")
    @Timed
    public ResponseEntity<FlightSeatReservation> getFlightSeatReservation(@PathVariable Long id) {
        log.debug("REST request to get FlightSeatReservation : {}", id);
        Optional<FlightSeatReservation> flightSeatReservation = flightSeatReservationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(flightSeatReservation);
    }
    
    /**
     * GET  /flight-seat-reservations/:id : get the "id" flightSeatReservation.
     *
     * @param id the id of the flightSeatReservation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the flightSeatReservation, or with status 404 (Not Found)
     */
    @GetMapping("/flight-seat-reservations-by-flight-id/{id}")
    @Timed
    public List<FlightSeatReservation> getFlightSeatReservationByFlightId(@PathVariable Long id) {
        log.debug("REST request to get FlightSeatReservation : {}", id);
        List<FlightSeatReservation> flightSeatReservation = flightSeatReservationRepository.findByFlightIdAndDeleted(id, false);
        return flightSeatReservation;
    }

    /**
     * DELETE  /flight-seat-reservations/:id : delete the "id" flightSeatReservation.
     *
     * @param id the id of the flightSeatReservation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/flight-seat-reservations/{id}")
    @Timed
    public ResponseEntity<Void> deleteFlightSeatReservation(@PathVariable Long id) {
        log.debug("REST request to delete FlightSeatReservation : {}", id);

        flightSeatReservationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
