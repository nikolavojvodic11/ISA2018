package com.isa.planetickets.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.isa.planetickets.domain.AvailableHotelService;
import com.isa.planetickets.repository.AvailableHotelServiceRepository;
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
 * REST controller for managing AvailableHotelService.
 */
@RestController
@RequestMapping("/api")
public class AvailableHotelServiceResource {

    private final Logger log = LoggerFactory.getLogger(AvailableHotelServiceResource.class);

    private static final String ENTITY_NAME = "availableHotelService";

    private final AvailableHotelServiceRepository availableHotelServiceRepository;

    public AvailableHotelServiceResource(AvailableHotelServiceRepository availableHotelServiceRepository) {
        this.availableHotelServiceRepository = availableHotelServiceRepository;
    }

    /**
     * POST  /available-hotel-services : Create a new availableHotelService.
     *
     * @param availableHotelService the availableHotelService to create
     * @return the ResponseEntity with status 201 (Created) and with body the new availableHotelService, or with status 400 (Bad Request) if the availableHotelService has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/available-hotel-services")
    @Timed
    public ResponseEntity<AvailableHotelService> createAvailableHotelService(@RequestBody AvailableHotelService availableHotelService) throws URISyntaxException {
        log.debug("REST request to save AvailableHotelService : {}", availableHotelService);
        if (availableHotelService.getId() != null) {
            throw new BadRequestAlertException("A new availableHotelService cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AvailableHotelService result = availableHotelServiceRepository.save(availableHotelService);
        return ResponseEntity.created(new URI("/api/available-hotel-services/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /available-hotel-services : Updates an existing availableHotelService.
     *
     * @param availableHotelService the availableHotelService to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated availableHotelService,
     * or with status 400 (Bad Request) if the availableHotelService is not valid,
     * or with status 500 (Internal Server Error) if the availableHotelService couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/available-hotel-services")
    @Timed
    public ResponseEntity<AvailableHotelService> updateAvailableHotelService(@RequestBody AvailableHotelService availableHotelService) throws URISyntaxException {
        log.debug("REST request to update AvailableHotelService : {}", availableHotelService);
        if (availableHotelService.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AvailableHotelService result = availableHotelServiceRepository.save(availableHotelService);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, availableHotelService.getId().toString()))
            .body(result);
    }

    /**
     * GET  /available-hotel-services : get all the availableHotelServices.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of availableHotelServices in body
     */
    @GetMapping("/available-hotel-services")
    @Timed
    public List<AvailableHotelService> getAllAvailableHotelServices() {
        log.debug("REST request to get all AvailableHotelServices");
        return availableHotelServiceRepository.findAll();
    }

    /**
     * GET  /available-hotel-services/:id : get the "id" availableHotelService.
     *
     * @param id the id of the availableHotelService to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the availableHotelService, or with status 404 (Not Found)
     */
    @GetMapping("/available-hotel-services/{id}")
    @Timed
    public ResponseEntity<AvailableHotelService> getAvailableHotelService(@PathVariable Long id) {
        log.debug("REST request to get AvailableHotelService : {}", id);
        Optional<AvailableHotelService> availableHotelService = availableHotelServiceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(availableHotelService);
    }

    /**
     * DELETE  /available-hotel-services/:id : delete the "id" availableHotelService.
     *
     * @param id the id of the availableHotelService to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/available-hotel-services/{id}")
    @Timed
    public ResponseEntity<Void> deleteAvailableHotelService(@PathVariable Long id) {
        log.debug("REST request to delete AvailableHotelService : {}", id);

        availableHotelServiceRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
