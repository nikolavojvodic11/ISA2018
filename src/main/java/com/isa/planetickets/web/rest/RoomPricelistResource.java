package com.isa.planetickets.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.isa.planetickets.domain.RoomPricelist;
import com.isa.planetickets.repository.RoomPricelistRepository;
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
 * REST controller for managing RoomPricelist.
 */
@RestController
@RequestMapping("/api")
public class RoomPricelistResource {

    private final Logger log = LoggerFactory.getLogger(RoomPricelistResource.class);

    private static final String ENTITY_NAME = "roomPricelist";

    private final RoomPricelistRepository roomPricelistRepository;

    public RoomPricelistResource(RoomPricelistRepository roomPricelistRepository) {
        this.roomPricelistRepository = roomPricelistRepository;
    }

    /**
     * POST  /room-pricelists : Create a new roomPricelist.
     *
     * @param roomPricelist the roomPricelist to create
     * @return the ResponseEntity with status 201 (Created) and with body the new roomPricelist, or with status 400 (Bad Request) if the roomPricelist has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/room-pricelists")
    @Timed
    public ResponseEntity<RoomPricelist> createRoomPricelist(@RequestBody RoomPricelist roomPricelist) throws URISyntaxException {
        log.debug("REST request to save RoomPricelist : {}", roomPricelist);
        if (roomPricelist.getId() != null) {
            throw new BadRequestAlertException("A new roomPricelist cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RoomPricelist result = roomPricelistRepository.save(roomPricelist);
        return ResponseEntity.created(new URI("/api/room-pricelists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /room-pricelists : Updates an existing roomPricelist.
     *
     * @param roomPricelist the roomPricelist to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated roomPricelist,
     * or with status 400 (Bad Request) if the roomPricelist is not valid,
     * or with status 500 (Internal Server Error) if the roomPricelist couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/room-pricelists")
    @Timed
    public ResponseEntity<RoomPricelist> updateRoomPricelist(@RequestBody RoomPricelist roomPricelist) throws URISyntaxException {
        log.debug("REST request to update RoomPricelist : {}", roomPricelist);
        if (roomPricelist.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RoomPricelist result = roomPricelistRepository.save(roomPricelist);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, roomPricelist.getId().toString()))
            .body(result);
    }

    /**
     * GET  /room-pricelists : get all the roomPricelists.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of roomPricelists in body
     */
    @GetMapping("/room-pricelists")
    @Timed
    public List<RoomPricelist> getAllRoomPricelists() {
        log.debug("REST request to get all RoomPricelists");
        return roomPricelistRepository.findAll();
    }

    /**
     * GET  /room-pricelists/:id : get the "id" roomPricelist.
     *
     * @param id the id of the roomPricelist to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the roomPricelist, or with status 404 (Not Found)
     */
    @GetMapping("/room-pricelists/{id}")
    @Timed
    public ResponseEntity<RoomPricelist> getRoomPricelist(@PathVariable Long id) {
        log.debug("REST request to get RoomPricelist : {}", id);
        Optional<RoomPricelist> roomPricelist = roomPricelistRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(roomPricelist);
    }

    /**
     * DELETE  /room-pricelists/:id : delete the "id" roomPricelist.
     *
     * @param id the id of the roomPricelist to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/room-pricelists/{id}")
    @Timed
    public ResponseEntity<Void> deleteRoomPricelist(@PathVariable Long id) {
        log.debug("REST request to delete RoomPricelist : {}", id);

        roomPricelistRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
