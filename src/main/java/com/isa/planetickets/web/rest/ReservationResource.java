package com.isa.planetickets.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.isa.planetickets.domain.Reservation;
import com.isa.planetickets.domain.User;
import com.isa.planetickets.repository.IsaUserRepository;
import com.isa.planetickets.repository.ReservationRepository;
import com.isa.planetickets.service.UserService;
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
 * REST controller for managing Reservation.
 */
@RestController
@RequestMapping("/api")
public class ReservationResource {

    private final Logger log = LoggerFactory.getLogger(ReservationResource.class);

    private static final String ENTITY_NAME = "reservation";

    private final ReservationRepository reservationRepository;
    
    private final IsaUserRepository isaUserRepository;
    
    private final UserService userService;

    public ReservationResource(ReservationRepository reservationRepository, UserService userService, IsaUserRepository isaUserRepository) {
        this.reservationRepository = reservationRepository;
        this.userService = userService;
        this.isaUserRepository = isaUserRepository;
    }

    /**
     * POST  /reservations : Create a new reservation.
     *
     * @param reservation the reservation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new reservation, or with status 400 (Bad Request) if the reservation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/reservations")
    @Timed
    public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation) throws URISyntaxException {
        log.debug("REST request to save Reservation : {}", reservation);
        if (reservation.getId() != null) {
            throw new BadRequestAlertException("A new reservation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Optional<User> user = userService.getUserWithAuthorities();
        reservation.setUser(isaUserRepository.findByJhiUserId(user.get().getId()));
        Reservation result = reservationRepository.save(reservation);
        return ResponseEntity.created(new URI("/api/reservations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /reservations : Updates an existing reservation.
     *
     * @param reservation the reservation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated reservation,
     * or with status 400 (Bad Request) if the reservation is not valid,
     * or with status 500 (Internal Server Error) if the reservation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/reservations")
    @Timed
    public ResponseEntity<Reservation> updateReservation(@RequestBody Reservation reservation) throws URISyntaxException {
        log.debug("REST request to update Reservation : {}", reservation);
        if (reservation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Reservation result = reservationRepository.save(reservation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, reservation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /reservations : get all the reservations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of reservations in body
     */
    @GetMapping("/reservations")
    @Timed
    public List<Reservation> getAllReservations() {
        log.debug("REST request to get all Reservations");
        return reservationRepository.findAll();
    }

    /**
     * GET  /reservations/:id : get the "id" reservation.
     *
     * @param id the id of the reservation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the reservation, or with status 404 (Not Found)
     */
    @GetMapping("/reservations/{id}")
    @Timed
    public ResponseEntity<Reservation> getReservation(@PathVariable Long id) {
        log.debug("REST request to get Reservation : {}", id);
        Optional<Reservation> reservation = reservationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(reservation);
    }

    /**
     * DELETE  /reservations/:id : delete the "id" reservation.
     *
     * @param id the id of the reservation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/reservations/{id}")
    @Timed
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        log.debug("REST request to delete Reservation : {}", id);

        reservationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
