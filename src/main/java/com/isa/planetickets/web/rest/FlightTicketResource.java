package com.isa.planetickets.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.isa.planetickets.domain.FlightTicket;
import com.isa.planetickets.repository.FlightTicketRepository;
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
 * REST controller for managing FlightTicket.
 */
@RestController
@RequestMapping("/api")
public class FlightTicketResource {

    private final Logger log = LoggerFactory.getLogger(FlightTicketResource.class);

    private static final String ENTITY_NAME = "flightTicket";

    private final FlightTicketRepository flightTicketRepository;

    public FlightTicketResource(FlightTicketRepository flightTicketRepository) {
        this.flightTicketRepository = flightTicketRepository;
    }

    /**
     * POST  /flight-tickets : Create a new flightTicket.
     *
     * @param flightTicket the flightTicket to create
     * @return the ResponseEntity with status 201 (Created) and with body the new flightTicket, or with status 400 (Bad Request) if the flightTicket has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/flight-tickets")
    @Timed
    public ResponseEntity<FlightTicket> createFlightTicket(@RequestBody FlightTicket flightTicket) throws URISyntaxException {
        log.debug("REST request to save FlightTicket : {}", flightTicket);
        if (flightTicket.getId() != null) {
            throw new BadRequestAlertException("A new flightTicket cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FlightTicket result = flightTicketRepository.save(flightTicket);
        return ResponseEntity.created(new URI("/api/flight-tickets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /flight-tickets : Updates an existing flightTicket.
     *
     * @param flightTicket the flightTicket to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated flightTicket,
     * or with status 400 (Bad Request) if the flightTicket is not valid,
     * or with status 500 (Internal Server Error) if the flightTicket couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/flight-tickets")
    @Timed
    public ResponseEntity<FlightTicket> updateFlightTicket(@RequestBody FlightTicket flightTicket) throws URISyntaxException {
        log.debug("REST request to update FlightTicket : {}", flightTicket);
        if (flightTicket.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FlightTicket result = flightTicketRepository.save(flightTicket);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, flightTicket.getId().toString()))
            .body(result);
    }

    /**
     * GET  /flight-tickets : get all the flightTickets.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of flightTickets in body
     */
    @GetMapping("/flight-tickets")
    @Timed
    public List<FlightTicket> getAllFlightTickets() {
        log.debug("REST request to get all FlightTickets");
        return flightTicketRepository.findAll();
    }

    /**
     * GET  /flight-tickets/:id : get the "id" flightTicket.
     *
     * @param id the id of the flightTicket to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the flightTicket, or with status 404 (Not Found)
     */
    @GetMapping("/flight-tickets/{id}")
    @Timed
    public ResponseEntity<FlightTicket> getFlightTicket(@PathVariable Long id) {
        log.debug("REST request to get FlightTicket : {}", id);
        Optional<FlightTicket> flightTicket = flightTicketRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(flightTicket);
    }

    /**
     * DELETE  /flight-tickets/:id : delete the "id" flightTicket.
     *
     * @param id the id of the flightTicket to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/flight-tickets/{id}")
    @Timed
    public ResponseEntity<Void> deleteFlightTicket(@PathVariable Long id) {
        log.debug("REST request to delete FlightTicket : {}", id);

        flightTicketRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
