package com.isa.planetickets.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.isa.planetickets.domain.HotelService;
import com.isa.planetickets.repository.HotelServiceRepository;
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
 * REST controller for managing HotelService.
 */
@RestController
@RequestMapping("/api")
public class HotelServiceResource {

    private final Logger log = LoggerFactory.getLogger(HotelServiceResource.class);

    private static final String ENTITY_NAME = "hotelService";

    private final HotelServiceRepository hotelServiceRepository;

    public HotelServiceResource(HotelServiceRepository hotelServiceRepository) {
        this.hotelServiceRepository = hotelServiceRepository;
    }

    /**
     * POST  /hotel-services : Create a new hotelService.
     *
     * @param hotelService the hotelService to create
     * @return the ResponseEntity with status 201 (Created) and with body the new hotelService, or with status 400 (Bad Request) if the hotelService has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/hotel-services")
    @Timed
    public ResponseEntity<HotelService> createHotelService(@RequestBody HotelService hotelService) throws URISyntaxException {
        log.debug("REST request to save HotelService : {}", hotelService);
        if (hotelService.getId() != null) {
            throw new BadRequestAlertException("A new hotelService cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HotelService result = hotelServiceRepository.save(hotelService);
        return ResponseEntity.created(new URI("/api/hotel-services/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /hotel-services : Updates an existing hotelService.
     *
     * @param hotelService the hotelService to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated hotelService,
     * or with status 400 (Bad Request) if the hotelService is not valid,
     * or with status 500 (Internal Server Error) if the hotelService couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/hotel-services")
    @Timed
    public ResponseEntity<HotelService> updateHotelService(@RequestBody HotelService hotelService) throws URISyntaxException {
        log.debug("REST request to update HotelService : {}", hotelService);
        if (hotelService.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HotelService result = hotelServiceRepository.save(hotelService);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, hotelService.getId().toString()))
            .body(result);
    }

    /**
     * GET  /hotel-services : get all the hotelServices.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of hotelServices in body
     */
    @GetMapping("/hotel-services")
    @Timed
    public List<HotelService> getAllHotelServices() {
        log.debug("REST request to get all HotelServices");
        return hotelServiceRepository.findAll();
    }

    /**
     * GET  /hotel-services/:id : get the "id" hotelService.
     *
     * @param id the id of the hotelService to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the hotelService, or with status 404 (Not Found)
     */
    @GetMapping("/hotel-services/{id}")
    @Timed
    public ResponseEntity<HotelService> getHotelService(@PathVariable Long id) {
        log.debug("REST request to get HotelService : {}", id);
        Optional<HotelService> hotelService = hotelServiceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(hotelService);
    }

    /**
     * DELETE  /hotel-services/:id : delete the "id" hotelService.
     *
     * @param id the id of the hotelService to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/hotel-services/{id}")
    @Timed
    public ResponseEntity<Void> deleteHotelService(@PathVariable Long id) {
        log.debug("REST request to delete HotelService : {}", id);

        hotelServiceRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
