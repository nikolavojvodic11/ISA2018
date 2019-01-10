package com.isa.planetickets.web.rest;

import com.isa.planetickets.PlaneTicketsApp;

import com.isa.planetickets.domain.FlightStop;
import com.isa.planetickets.repository.FlightStopRepository;
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

/**
 * Test class for the FlightStopResource REST controller.
 *
 * @see FlightStopResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PlaneTicketsApp.class)
public class FlightStopResourceIntTest {

    @Autowired
    private FlightStopRepository flightStopRepository;

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

    private MockMvc restFlightStopMockMvc;

    private FlightStop flightStop;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FlightStopResource flightStopResource = new FlightStopResource(flightStopRepository);
        this.restFlightStopMockMvc = MockMvcBuilders.standaloneSetup(flightStopResource)
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
    public static FlightStop createEntity(EntityManager em) {
        FlightStop flightStop = new FlightStop();
        return flightStop;
    }

    @Before
    public void initTest() {
        flightStop = createEntity(em);
    }

    @Test
    @Transactional
    public void createFlightStop() throws Exception {
        int databaseSizeBeforeCreate = flightStopRepository.findAll().size();

        // Create the FlightStop
        restFlightStopMockMvc.perform(post("/api/flight-stops")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightStop)))
            .andExpect(status().isCreated());

        // Validate the FlightStop in the database
        List<FlightStop> flightStopList = flightStopRepository.findAll();
        assertThat(flightStopList).hasSize(databaseSizeBeforeCreate + 1);
        FlightStop testFlightStop = flightStopList.get(flightStopList.size() - 1);
    }

    @Test
    @Transactional
    public void createFlightStopWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = flightStopRepository.findAll().size();

        // Create the FlightStop with an existing ID
        flightStop.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFlightStopMockMvc.perform(post("/api/flight-stops")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightStop)))
            .andExpect(status().isBadRequest());

        // Validate the FlightStop in the database
        List<FlightStop> flightStopList = flightStopRepository.findAll();
        assertThat(flightStopList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFlightStops() throws Exception {
        // Initialize the database
        flightStopRepository.saveAndFlush(flightStop);

        // Get all the flightStopList
        restFlightStopMockMvc.perform(get("/api/flight-stops?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(flightStop.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getFlightStop() throws Exception {
        // Initialize the database
        flightStopRepository.saveAndFlush(flightStop);

        // Get the flightStop
        restFlightStopMockMvc.perform(get("/api/flight-stops/{id}", flightStop.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(flightStop.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingFlightStop() throws Exception {
        // Get the flightStop
        restFlightStopMockMvc.perform(get("/api/flight-stops/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFlightStop() throws Exception {
        // Initialize the database
        flightStopRepository.saveAndFlush(flightStop);

        int databaseSizeBeforeUpdate = flightStopRepository.findAll().size();

        // Update the flightStop
        FlightStop updatedFlightStop = flightStopRepository.findById(flightStop.getId()).get();
        // Disconnect from session so that the updates on updatedFlightStop are not directly saved in db
        em.detach(updatedFlightStop);

        restFlightStopMockMvc.perform(put("/api/flight-stops")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFlightStop)))
            .andExpect(status().isOk());

        // Validate the FlightStop in the database
        List<FlightStop> flightStopList = flightStopRepository.findAll();
        assertThat(flightStopList).hasSize(databaseSizeBeforeUpdate);
        FlightStop testFlightStop = flightStopList.get(flightStopList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingFlightStop() throws Exception {
        int databaseSizeBeforeUpdate = flightStopRepository.findAll().size();

        // Create the FlightStop

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFlightStopMockMvc.perform(put("/api/flight-stops")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightStop)))
            .andExpect(status().isBadRequest());

        // Validate the FlightStop in the database
        List<FlightStop> flightStopList = flightStopRepository.findAll();
        assertThat(flightStopList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFlightStop() throws Exception {
        // Initialize the database
        flightStopRepository.saveAndFlush(flightStop);

        int databaseSizeBeforeDelete = flightStopRepository.findAll().size();

        // Get the flightStop
        restFlightStopMockMvc.perform(delete("/api/flight-stops/{id}", flightStop.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FlightStop> flightStopList = flightStopRepository.findAll();
        assertThat(flightStopList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FlightStop.class);
        FlightStop flightStop1 = new FlightStop();
        flightStop1.setId(1L);
        FlightStop flightStop2 = new FlightStop();
        flightStop2.setId(flightStop1.getId());
        assertThat(flightStop1).isEqualTo(flightStop2);
        flightStop2.setId(2L);
        assertThat(flightStop1).isNotEqualTo(flightStop2);
        flightStop1.setId(null);
        assertThat(flightStop1).isNotEqualTo(flightStop2);
    }
}
