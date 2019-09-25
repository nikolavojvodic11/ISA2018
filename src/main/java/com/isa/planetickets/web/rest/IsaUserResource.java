package com.isa.planetickets.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.isa.planetickets.domain.IsaUser;
import com.isa.planetickets.repository.IsaUserRepository;
import com.isa.planetickets.web.rest.errors.BadRequestAlertException;
import com.isa.planetickets.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing IsaUser.
 */
@RestController
@RequestMapping("/api")
public class IsaUserResource {

    private final Logger log = LoggerFactory.getLogger(IsaUserResource.class);

    private static final String ENTITY_NAME = "isaUser";

    private final IsaUserRepository isaUserRepository;

    public IsaUserResource(IsaUserRepository isaUserRepository) {
        this.isaUserRepository = isaUserRepository;
    }

    /**
     * POST  /isa-users : Create a new isaUser.
     *
     * @param isaUser the isaUser to create
     * @return the ResponseEntity with status 201 (Created) and with body the new isaUser, or with status 400 (Bad Request) if the isaUser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/isa-users")
    @Timed
    public ResponseEntity<IsaUser> createIsaUser(@RequestBody IsaUser isaUser) throws URISyntaxException {
        log.debug("REST request to save IsaUser : {}", isaUser);
        if (isaUser.getId() != null) {
            throw new BadRequestAlertException("A new isaUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IsaUser result = isaUserRepository.save(isaUser);
        return ResponseEntity.created(new URI("/api/isa-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /isa-users : Updates an existing isaUser.
     *
     * @param isaUser the isaUser to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated isaUser,
     * or with status 400 (Bad Request) if the isaUser is not valid,
     * or with status 500 (Internal Server Error) if the isaUser couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/isa-users")
    @Timed
    public ResponseEntity<IsaUser> updateIsaUser(@RequestBody IsaUser isaUser) throws URISyntaxException {
        log.debug("REST request to update IsaUser : {}", isaUser);
        if (isaUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        IsaUser result = isaUserRepository.save(isaUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, isaUser.getId().toString()))
            .body(result);
    }

    /**
     * GET  /isa-users : get all the isaUsers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of isaUsers in body
     */
    @GetMapping("/isa-users")
    @Timed
    public List<IsaUser> getAllIsaUsers(@RequestParam(name = "jhiUserId", required = false) Long jhiUserId) {
        log.debug("REST request to get all IsaUsers");
        if (jhiUserId != null) {
        	List<IsaUser> user = new ArrayList<IsaUser>();
        	user.add(isaUserRepository.findByJhiUserId(jhiUserId));
        	return user;
        }
        return isaUserRepository.findAll();
    }

    /**
     * GET  /isa-users/:id : get the "id" isaUser.
     *
     * @param id the id of the isaUser to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the isaUser, or with status 404 (Not Found)
     */
    @GetMapping("/isa-users/{id}")
    @Timed
    public ResponseEntity<IsaUser> getIsaUser(@PathVariable Long id) {
        log.debug("REST request to get IsaUser : {}", id);
        Optional<IsaUser> isaUser = isaUserRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(isaUser);
    }

    /**
     * DELETE  /isa-users/:id : delete the "id" isaUser.
     *
     * @param id the id of the isaUser to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/isa-users/{id}")
    @Timed
    public ResponseEntity<Void> deleteIsaUser(@PathVariable Long id) {
        log.debug("REST request to delete IsaUser : {}", id);

        isaUserRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
