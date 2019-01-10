package com.isa.planetickets.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.isa.planetickets.domain.FlightStop;
import com.isa.planetickets.repository.FlightStopRepository;
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
 * REST controller for managing FlightStop.
 */
@RestController
@RequestMapping("/api")
public class FlightStopResource {

    private final Logger log = LoggerFactory.getLogger(FlightStopResource.class);

    private static final String ENTITY_NAME = "flightStop";

    private final FlightStopRepository flightStopRepository;

    public FlightStopResource(FlightStopRepository flightStopRepository) {
        this.flightStopRepository = flightStopRepository;
    }

    /**
     * POST  /flight-stops : Create a new flightStop.
     *
     * @param flightStop the flightStop to create
     * @return the ResponseEntity with status 201 (Created) and with body the new flightStop, or with status 400 (Bad Request) if the flightStop has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/flight-stops")
    @Timed
    public ResponseEntity<FlightStop> createFlightStop(@RequestBody FlightStop flightStop) throws URISyntaxException {
        log.debug("REST request to save FlightStop : {}", flightStop);
        if (flightStop.getId() != null) {
            throw new BadRequestAlertException("A new flightStop cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FlightStop result = flightStopRepository.save(flightStop);
        return ResponseEntity.created(new URI("/api/flight-stops/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /flight-stops : Updates an existing flightStop.
     *
     * @param flightStop the flightStop to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated flightStop,
     * or with status 400 (Bad Request) if the flightStop is not valid,
     * or with status 500 (Internal Server Error) if the flightStop couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/flight-stops")
    @Timed
    public ResponseEntity<FlightStop> updateFlightStop(@RequestBody FlightStop flightStop) throws URISyntaxException {
        log.debug("REST request to update FlightStop : {}", flightStop);
        if (flightStop.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FlightStop result = flightStopRepository.save(flightStop);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, flightStop.getId().toString()))
            .body(result);
    }

    /**
     * GET  /flight-stops : get all the flightStops.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of flightStops in body
     */
    @GetMapping("/flight-stops")
    @Timed
    public List<FlightStop> getAllFlightStops() {
        log.debug("REST request to get all FlightStops");
        return flightStopRepository.findAll();
    }

    /**
     * GET  /flight-stops/:id : get the "id" flightStop.
     *
     * @param id the id of the flightStop to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the flightStop, or with status 404 (Not Found)
     */
    @GetMapping("/flight-stops/{id}")
    @Timed
    public ResponseEntity<FlightStop> getFlightStop(@PathVariable Long id) {
        log.debug("REST request to get FlightStop : {}", id);
        Optional<FlightStop> flightStop = flightStopRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(flightStop);
    }

    /**
     * DELETE  /flight-stops/:id : delete the "id" flightStop.
     *
     * @param id the id of the flightStop to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/flight-stops/{id}")
    @Timed
    public ResponseEntity<Void> deleteFlightStop(@PathVariable Long id) {
        log.debug("REST request to delete FlightStop : {}", id);

        flightStopRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
