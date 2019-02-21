package com.isa.planetickets.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.isa.planetickets.domain.HotelServiceReservation;
import com.isa.planetickets.repository.HotelServiceReservationRepository;
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
 * REST controller for managing HotelServiceReservation.
 */
@RestController
@RequestMapping("/api")
public class HotelServiceReservationResource {

    private final Logger log = LoggerFactory.getLogger(HotelServiceReservationResource.class);

    private static final String ENTITY_NAME = "hotelServiceReservation";

    private final HotelServiceReservationRepository hotelServiceReservationRepository;

    public HotelServiceReservationResource(HotelServiceReservationRepository hotelServiceReservationRepository) {
        this.hotelServiceReservationRepository = hotelServiceReservationRepository;
    }

    /**
     * POST  /hotel-service-reservations : Create a new hotelServiceReservation.
     *
     * @param hotelServiceReservation the hotelServiceReservation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new hotelServiceReservation, or with status 400 (Bad Request) if the hotelServiceReservation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/hotel-service-reservations")
    @Timed
    public ResponseEntity<HotelServiceReservation> createHotelServiceReservation(@RequestBody HotelServiceReservation hotelServiceReservation) throws URISyntaxException {
        log.debug("REST request to save HotelServiceReservation : {}", hotelServiceReservation);
        if (hotelServiceReservation.getId() != null) {
            throw new BadRequestAlertException("A new hotelServiceReservation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HotelServiceReservation result = hotelServiceReservationRepository.save(hotelServiceReservation);
        return ResponseEntity.created(new URI("/api/hotel-service-reservations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /hotel-service-reservations : Updates an existing hotelServiceReservation.
     *
     * @param hotelServiceReservation the hotelServiceReservation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated hotelServiceReservation,
     * or with status 400 (Bad Request) if the hotelServiceReservation is not valid,
     * or with status 500 (Internal Server Error) if the hotelServiceReservation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/hotel-service-reservations")
    @Timed
    public ResponseEntity<HotelServiceReservation> updateHotelServiceReservation(@RequestBody HotelServiceReservation hotelServiceReservation) throws URISyntaxException {
        log.debug("REST request to update HotelServiceReservation : {}", hotelServiceReservation);
        if (hotelServiceReservation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HotelServiceReservation result = hotelServiceReservationRepository.save(hotelServiceReservation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, hotelServiceReservation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /hotel-service-reservations : get all the hotelServiceReservations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of hotelServiceReservations in body
     */
    @GetMapping("/hotel-service-reservations")
    @Timed
    public List<HotelServiceReservation> getAllHotelServiceReservations() {
        log.debug("REST request to get all HotelServiceReservations");
        return hotelServiceReservationRepository.findAll();
    }

    /**
     * GET  /hotel-service-reservations/:id : get the "id" hotelServiceReservation.
     *
     * @param id the id of the hotelServiceReservation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the hotelServiceReservation, or with status 404 (Not Found)
     */
    @GetMapping("/hotel-service-reservations/{id}")
    @Timed
    public ResponseEntity<HotelServiceReservation> getHotelServiceReservation(@PathVariable Long id) {
        log.debug("REST request to get HotelServiceReservation : {}", id);
        Optional<HotelServiceReservation> hotelServiceReservation = hotelServiceReservationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(hotelServiceReservation);
    }

    /**
     * DELETE  /hotel-service-reservations/:id : delete the "id" hotelServiceReservation.
     *
     * @param id the id of the hotelServiceReservation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/hotel-service-reservations/{id}")
    @Timed
    public ResponseEntity<Void> deleteHotelServiceReservation(@PathVariable Long id) {
        log.debug("REST request to delete HotelServiceReservation : {}", id);

        hotelServiceReservationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
