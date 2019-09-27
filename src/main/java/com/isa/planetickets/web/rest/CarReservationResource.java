package com.isa.planetickets.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.isa.planetickets.domain.CarReservation;
import com.isa.planetickets.domain.HotelRoomReservation;
import com.isa.planetickets.repository.CarReservationRepository;
import com.isa.planetickets.web.rest.errors.BadRequestAlertException;
import com.isa.planetickets.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CarReservation.
 */
@RestController
@RequestMapping("/api")
public class CarReservationResource {

    private final Logger log = LoggerFactory.getLogger(CarReservationResource.class);

    private static final String ENTITY_NAME = "carReservation";

    private final CarReservationRepository carReservationRepository;

    public CarReservationResource(CarReservationRepository carReservationRepository) {
        this.carReservationRepository = carReservationRepository;
    }

    /**
     * POST  /car-reservations : Create a new carReservation.
     *
     * @param carReservation the carReservation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new carReservation, or with status 400 (Bad Request) if the carReservation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/car-reservations")
    @Timed
    public ResponseEntity<CarReservation> createCarReservation(@RequestBody CarReservation carReservation) throws URISyntaxException {
        log.debug("REST request to save CarReservation : {}", carReservation);
        if (carReservation.getId() != null) {
            throw new BadRequestAlertException("A new carReservation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (carReservation.getDateFrom() == null || carReservation.getDateTo() == null || carReservation.getCar() == null) {
        	throw new BadRequestAlertException("Car, check in and check out dates are required", ENTITY_NAME, "idexists");
        }
        if (carReservationRepository.isCarTaken(carReservation.getCar().getId(), carReservation.getDateFrom(), carReservation.getDateTo()).size() > 0) {
        	throw new BadRequestAlertException("Car is reserved", ENTITY_NAME, "idexists");
        }
        CarReservation result = carReservationRepository.save(carReservation);
        return ResponseEntity.created(new URI("/api/car-reservations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /car-reservations : Updates an existing carReservation.
     *
     * @param carReservation the carReservation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated carReservation,
     * or with status 400 (Bad Request) if the carReservation is not valid,
     * or with status 500 (Internal Server Error) if the carReservation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/car-reservations")
    @Timed
    public ResponseEntity<CarReservation> updateCarReservation(@RequestBody CarReservation carReservation) throws URISyntaxException {
        log.debug("REST request to update CarReservation : {}", carReservation);
        if (carReservation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CarReservation result = carReservationRepository.save(carReservation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, carReservation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /car-reservations : get all the carReservations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of carReservations in body
     */
    @GetMapping("/car-reservations")
    @Timed
    public List<CarReservation> getAllCarReservations() {
        log.debug("REST request to get all CarReservations");
        return carReservationRepository.findAll();
    }

    /**
     * GET  /car-reservations/:id : get the "id" carReservation.
     *
     * @param id the id of the carReservation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the carReservation, or with status 404 (Not Found)
     */
    @GetMapping("/car-reservations/{id}")
    @Timed
    public ResponseEntity<CarReservation> getCarReservation(@PathVariable Long id) {
        log.debug("REST request to get CarReservation : {}", id);
        Optional<CarReservation> carReservation = carReservationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(carReservation);
    }
    
    /**
     * GET  /roomsByHotelId/{hotelId} : get all the rooms by hotel id.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of rooms in body
     */
    @GetMapping("/carReservationsByCompanyLocationId/{companyLocationId}")
    @Timed
    public List<CarReservation> getCarReservationsByCompanyLocationId(
    		@PathVariable Long companyLocationId,
    		@RequestParam(name = "checkInDate", required = false) String checkInDate,
    		@RequestParam(name = "checkOutDate", required = false) String checkOutDate
    		) {  
    	Instant dateFrom = LocalDate.parse(checkInDate.substring(0,10)).atStartOfDay(ZoneOffset.UTC).toInstant();
    	Instant dateTo = LocalDate.parse(checkOutDate.substring(0,10)).atStartOfDay(ZoneOffset.UTC).toInstant();
    	return carReservationRepository.findByCompanyLocationIdAndReserved(companyLocationId, dateFrom, dateTo);
    }

    /**
     * DELETE  /car-reservations/:id : delete the "id" carReservation.
     *
     * @param id the id of the carReservation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/car-reservations/{id}")
    @Timed
    public ResponseEntity<Void> deleteCarReservation(@PathVariable Long id) {
        log.debug("REST request to delete CarReservation : {}", id);

        carReservationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
