package com.isa.planetickets.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.isa.planetickets.domain.FriendRequest;
import com.isa.planetickets.repository.FriendRequestRepository;
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
 * REST controller for managing FriendRequest.
 */
@RestController
@RequestMapping("/api")
public class FriendRequestResource {

    private final Logger log = LoggerFactory.getLogger(FriendRequestResource.class);

    private static final String ENTITY_NAME = "friendRequest";

    private final FriendRequestRepository friendRequestRepository;

    public FriendRequestResource(FriendRequestRepository friendRequestRepository) {
        this.friendRequestRepository = friendRequestRepository;
    }

    /**
     * POST  /friend-requests : Create a new friendRequest.
     *
     * @param friendRequest the friendRequest to create
     * @return the ResponseEntity with status 201 (Created) and with body the new friendRequest, or with status 400 (Bad Request) if the friendRequest has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/friend-requests")
    @Timed
    public ResponseEntity<FriendRequest> createFriendRequest(@RequestBody FriendRequest friendRequest) throws URISyntaxException {
        log.debug("REST request to save FriendRequest : {}", friendRequest);
        if (friendRequest.getId() != null) {
            throw new BadRequestAlertException("A new friendRequest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FriendRequest result = friendRequestRepository.save(friendRequest);
        return ResponseEntity.created(new URI("/api/friend-requests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /friend-requests : Updates an existing friendRequest.
     *
     * @param friendRequest the friendRequest to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated friendRequest,
     * or with status 400 (Bad Request) if the friendRequest is not valid,
     * or with status 500 (Internal Server Error) if the friendRequest couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/friend-requests")
    @Timed
    public ResponseEntity<FriendRequest> updateFriendRequest(@RequestBody FriendRequest friendRequest) throws URISyntaxException {
        log.debug("REST request to update FriendRequest : {}", friendRequest);
        if (friendRequest.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FriendRequest result = friendRequestRepository.save(friendRequest);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, friendRequest.getId().toString()))
            .body(result);
    }

    /**
     * GET  /friend-requests : get all the friendRequests.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of friendRequests in body
     */
    @GetMapping("/friend-requests")
    @Timed
    public List<FriendRequest> getAllFriendRequests() {
        log.debug("REST request to get all FriendRequests");
        return friendRequestRepository.findAll();
    }

    /**
     * GET  /friend-requests/:id : get the "id" friendRequest.
     *
     * @param id the id of the friendRequest to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the friendRequest, or with status 404 (Not Found)
     */
    @GetMapping("/friend-requests/{id}")
    @Timed
    public ResponseEntity<FriendRequest> getFriendRequest(@PathVariable Long id) {
        log.debug("REST request to get FriendRequest : {}", id);
        Optional<FriendRequest> friendRequest = friendRequestRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(friendRequest);
    }

    /**
     * DELETE  /friend-requests/:id : delete the "id" friendRequest.
     *
     * @param id the id of the friendRequest to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/friend-requests/{id}")
    @Timed
    public ResponseEntity<Void> deleteFriendRequest(@PathVariable Long id) {
        log.debug("REST request to delete FriendRequest : {}", id);

        friendRequestRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
