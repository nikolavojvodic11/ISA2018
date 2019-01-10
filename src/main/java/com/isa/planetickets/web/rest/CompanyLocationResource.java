package com.isa.planetickets.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.isa.planetickets.domain.CompanyLocation;
import com.isa.planetickets.repository.CompanyLocationRepository;
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
 * REST controller for managing CompanyLocation.
 */
@RestController
@RequestMapping("/api")
public class CompanyLocationResource {

    private final Logger log = LoggerFactory.getLogger(CompanyLocationResource.class);

    private static final String ENTITY_NAME = "companyLocation";

    private final CompanyLocationRepository companyLocationRepository;

    public CompanyLocationResource(CompanyLocationRepository companyLocationRepository) {
        this.companyLocationRepository = companyLocationRepository;
    }

    /**
     * POST  /company-locations : Create a new companyLocation.
     *
     * @param companyLocation the companyLocation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new companyLocation, or with status 400 (Bad Request) if the companyLocation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/company-locations")
    @Timed
    public ResponseEntity<CompanyLocation> createCompanyLocation(@RequestBody CompanyLocation companyLocation) throws URISyntaxException {
        log.debug("REST request to save CompanyLocation : {}", companyLocation);
        if (companyLocation.getId() != null) {
            throw new BadRequestAlertException("A new companyLocation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CompanyLocation result = companyLocationRepository.save(companyLocation);
        return ResponseEntity.created(new URI("/api/company-locations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /company-locations : Updates an existing companyLocation.
     *
     * @param companyLocation the companyLocation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated companyLocation,
     * or with status 400 (Bad Request) if the companyLocation is not valid,
     * or with status 500 (Internal Server Error) if the companyLocation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/company-locations")
    @Timed
    public ResponseEntity<CompanyLocation> updateCompanyLocation(@RequestBody CompanyLocation companyLocation) throws URISyntaxException {
        log.debug("REST request to update CompanyLocation : {}", companyLocation);
        if (companyLocation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CompanyLocation result = companyLocationRepository.save(companyLocation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, companyLocation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /company-locations : get all the companyLocations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of companyLocations in body
     */
    @GetMapping("/company-locations")
    @Timed
    public List<CompanyLocation> getAllCompanyLocations() {
        log.debug("REST request to get all CompanyLocations");
        return companyLocationRepository.findAll();
    }

    /**
     * GET  /company-locations/:id : get the "id" companyLocation.
     *
     * @param id the id of the companyLocation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the companyLocation, or with status 404 (Not Found)
     */
    @GetMapping("/company-locations/{id}")
    @Timed
    public ResponseEntity<CompanyLocation> getCompanyLocation(@PathVariable Long id) {
        log.debug("REST request to get CompanyLocation : {}", id);
        Optional<CompanyLocation> companyLocation = companyLocationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(companyLocation);
    }

    /**
     * DELETE  /company-locations/:id : delete the "id" companyLocation.
     *
     * @param id the id of the companyLocation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/company-locations/{id}")
    @Timed
    public ResponseEntity<Void> deleteCompanyLocation(@PathVariable Long id) {
        log.debug("REST request to delete CompanyLocation : {}", id);

        companyLocationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
