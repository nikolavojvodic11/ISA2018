package com.isa.planetickets.web.rest;

import com.isa.planetickets.PlaneTicketsApp;

import com.isa.planetickets.domain.FlightSeatReservation;
import com.isa.planetickets.repository.FlightSeatReservationRepository;
import com.isa.planetickets.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.isa.planetickets.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.isa.planetickets.domain.enumeration.ReservationStatus;
/**
 * Test class for the FlightSeatReservationResource REST controller.
 *
 * @see FlightSeatReservationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PlaneTicketsApp.class)
public class FlightSeatReservationResourceIntTest {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PASSPORT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PASSPORT_NUMBER = "BBBBBBBBBB";

    private static final ReservationStatus DEFAULT_STATUS = ReservationStatus.RESERVED;
    private static final ReservationStatus UPDATED_STATUS = ReservationStatus.CONFIRMED;

    private static final Double DEFAULT_PRICE = 1D;
    private static final Double UPDATED_PRICE = 2D;

    @Autowired
    private FlightSeatReservationRepository flightSeatReservationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restFlightSeatReservationMockMvc;

    private FlightSeatReservation flightSeatReservation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FlightSeatReservationResource flightSeatReservationResource = new FlightSeatReservationResource(flightSeatReservationRepository);
        this.restFlightSeatReservationMockMvc = MockMvcBuilders.standaloneSetup(flightSeatReservationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FlightSeatReservation createEntity(EntityManager em) {
        FlightSeatReservation flightSeatReservation = new FlightSeatReservation()
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .passportNumber(DEFAULT_PASSPORT_NUMBER)
            .status(DEFAULT_STATUS)
            .price(DEFAULT_PRICE);
        return flightSeatReservation;
    }

    @Before
    public void initTest() {
        flightSeatReservation = createEntity(em);
    }

    @Test
    @Transactional
    public void createFlightSeatReservation() throws Exception {
        int databaseSizeBeforeCreate = flightSeatReservationRepository.findAll().size();

        // Create the FlightSeatReservation
        restFlightSeatReservationMockMvc.perform(post("/api/flight-seat-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightSeatReservation)))
            .andExpect(status().isCreated());

        // Validate the FlightSeatReservation in the database
        List<FlightSeatReservation> flightSeatReservationList = flightSeatReservationRepository.findAll();
        assertThat(flightSeatReservationList).hasSize(databaseSizeBeforeCreate + 1);
        FlightSeatReservation testFlightSeatReservation = flightSeatReservationList.get(flightSeatReservationList.size() - 1);
        assertThat(testFlightSeatReservation.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testFlightSeatReservation.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testFlightSeatReservation.getPassportNumber()).isEqualTo(DEFAULT_PASSPORT_NUMBER);
        assertThat(testFlightSeatReservation.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testFlightSeatReservation.getPrice()).isEqualTo(DEFAULT_PRICE);
    }

    @Test
    @Transactional
    public void createFlightSeatReservationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = flightSeatReservationRepository.findAll().size();

        // Create the FlightSeatReservation with an existing ID
        flightSeatReservation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFlightSeatReservationMockMvc.perform(post("/api/flight-seat-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightSeatReservation)))
            .andExpect(status().isBadRequest());

        // Validate the FlightSeatReservation in the database
        List<FlightSeatReservation> flightSeatReservationList = flightSeatReservationRepository.findAll();
        assertThat(flightSeatReservationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFlightSeatReservations() throws Exception {
        // Initialize the database
        flightSeatReservationRepository.saveAndFlush(flightSeatReservation);

        // Get all the flightSeatReservationList
        restFlightSeatReservationMockMvc.perform(get("/api/flight-seat-reservations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(flightSeatReservation.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].passportNumber").value(hasItem(DEFAULT_PASSPORT_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getFlightSeatReservation() throws Exception {
        // Initialize the database
        flightSeatReservationRepository.saveAndFlush(flightSeatReservation);

        // Get the flightSeatReservation
        restFlightSeatReservationMockMvc.perform(get("/api/flight-seat-reservations/{id}", flightSeatReservation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(flightSeatReservation.getId().intValue()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME.toString()))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME.toString()))
            .andExpect(jsonPath("$.passportNumber").value(DEFAULT_PASSPORT_NUMBER.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingFlightSeatReservation() throws Exception {
        // Get the flightSeatReservation
        restFlightSeatReservationMockMvc.perform(get("/api/flight-seat-reservations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFlightSeatReservation() throws Exception {
        // Initialize the database
        flightSeatReservationRepository.saveAndFlush(flightSeatReservation);

        int databaseSizeBeforeUpdate = flightSeatReservationRepository.findAll().size();

        // Update the flightSeatReservation
        FlightSeatReservation updatedFlightSeatReservation = flightSeatReservationRepository.findById(flightSeatReservation.getId()).get();
        // Disconnect from session so that the updates on updatedFlightSeatReservation are not directly saved in db
        em.detach(updatedFlightSeatReservation);
        updatedFlightSeatReservation
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .passportNumber(UPDATED_PASSPORT_NUMBER)
            .status(UPDATED_STATUS)
            .price(UPDATED_PRICE);

        restFlightSeatReservationMockMvc.perform(put("/api/flight-seat-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFlightSeatReservation)))
            .andExpect(status().isOk());

        // Validate the FlightSeatReservation in the database
        List<FlightSeatReservation> flightSeatReservationList = flightSeatReservationRepository.findAll();
        assertThat(flightSeatReservationList).hasSize(databaseSizeBeforeUpdate);
        FlightSeatReservation testFlightSeatReservation = flightSeatReservationList.get(flightSeatReservationList.size() - 1);
        assertThat(testFlightSeatReservation.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testFlightSeatReservation.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testFlightSeatReservation.getPassportNumber()).isEqualTo(UPDATED_PASSPORT_NUMBER);
        assertThat(testFlightSeatReservation.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testFlightSeatReservation.getPrice()).isEqualTo(UPDATED_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingFlightSeatReservation() throws Exception {
        int databaseSizeBeforeUpdate = flightSeatReservationRepository.findAll().size();

        // Create the FlightSeatReservation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFlightSeatReservationMockMvc.perform(put("/api/flight-seat-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightSeatReservation)))
            .andExpect(status().isBadRequest());

        // Validate the FlightSeatReservation in the database
        List<FlightSeatReservation> flightSeatReservationList = flightSeatReservationRepository.findAll();
        assertThat(flightSeatReservationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFlightSeatReservation() throws Exception {
        // Initialize the database
        flightSeatReservationRepository.saveAndFlush(flightSeatReservation);

        int databaseSizeBeforeDelete = flightSeatReservationRepository.findAll().size();

        // Get the flightSeatReservation
        restFlightSeatReservationMockMvc.perform(delete("/api/flight-seat-reservations/{id}", flightSeatReservation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FlightSeatReservation> flightSeatReservationList = flightSeatReservationRepository.findAll();
        assertThat(flightSeatReservationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FlightSeatReservation.class);
        FlightSeatReservation flightSeatReservation1 = new FlightSeatReservation();
        flightSeatReservation1.setId(1L);
        FlightSeatReservation flightSeatReservation2 = new FlightSeatReservation();
        flightSeatReservation2.setId(flightSeatReservation1.getId());
        assertThat(flightSeatReservation1).isEqualTo(flightSeatReservation2);
        flightSeatReservation2.setId(2L);
        assertThat(flightSeatReservation1).isNotEqualTo(flightSeatReservation2);
        flightSeatReservation1.setId(null);
        assertThat(flightSeatReservation1).isNotEqualTo(flightSeatReservation2);
    }
}
