package com.isa.planetickets.web.rest;

import com.isa.planetickets.PlaneTicketsApp;

import com.isa.planetickets.domain.FlightTicket;
import com.isa.planetickets.repository.FlightTicketRepository;
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
 * Test class for the FlightTicketResource REST controller.
 *
 * @see FlightTicketResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PlaneTicketsApp.class)
public class FlightTicketResourceIntTest {

    private static final Integer DEFAULT_SEAT_ROW = 1;
    private static final Integer UPDATED_SEAT_ROW = 2;

    private static final Integer DEFAULT_SEAT_COL = 1;
    private static final Integer UPDATED_SEAT_COL = 2;

    @Autowired
    private FlightTicketRepository flightTicketRepository;

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

    private MockMvc restFlightTicketMockMvc;

    private FlightTicket flightTicket;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FlightTicketResource flightTicketResource = new FlightTicketResource(flightTicketRepository);
        this.restFlightTicketMockMvc = MockMvcBuilders.standaloneSetup(flightTicketResource)
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
    public static FlightTicket createEntity(EntityManager em) {
        FlightTicket flightTicket = new FlightTicket()
            .seatRow(DEFAULT_SEAT_ROW)
            .seatCol(DEFAULT_SEAT_COL);
        return flightTicket;
    }

    @Before
    public void initTest() {
        flightTicket = createEntity(em);
    }

    @Test
    @Transactional
    public void createFlightTicket() throws Exception {
        int databaseSizeBeforeCreate = flightTicketRepository.findAll().size();

        // Create the FlightTicket
        restFlightTicketMockMvc.perform(post("/api/flight-tickets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightTicket)))
            .andExpect(status().isCreated());

        // Validate the FlightTicket in the database
        List<FlightTicket> flightTicketList = flightTicketRepository.findAll();
        assertThat(flightTicketList).hasSize(databaseSizeBeforeCreate + 1);
        FlightTicket testFlightTicket = flightTicketList.get(flightTicketList.size() - 1);
        assertThat(testFlightTicket.getSeatRow()).isEqualTo(DEFAULT_SEAT_ROW);
        assertThat(testFlightTicket.getSeatCol()).isEqualTo(DEFAULT_SEAT_COL);
    }

    @Test
    @Transactional
    public void createFlightTicketWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = flightTicketRepository.findAll().size();

        // Create the FlightTicket with an existing ID
        flightTicket.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFlightTicketMockMvc.perform(post("/api/flight-tickets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightTicket)))
            .andExpect(status().isBadRequest());

        // Validate the FlightTicket in the database
        List<FlightTicket> flightTicketList = flightTicketRepository.findAll();
        assertThat(flightTicketList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFlightTickets() throws Exception {
        // Initialize the database
        flightTicketRepository.saveAndFlush(flightTicket);

        // Get all the flightTicketList
        restFlightTicketMockMvc.perform(get("/api/flight-tickets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(flightTicket.getId().intValue())))
            .andExpect(jsonPath("$.[*].seatRow").value(hasItem(DEFAULT_SEAT_ROW)))
            .andExpect(jsonPath("$.[*].seatCol").value(hasItem(DEFAULT_SEAT_COL)));
    }
    
    @Test
    @Transactional
    public void getFlightTicket() throws Exception {
        // Initialize the database
        flightTicketRepository.saveAndFlush(flightTicket);

        // Get the flightTicket
        restFlightTicketMockMvc.perform(get("/api/flight-tickets/{id}", flightTicket.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(flightTicket.getId().intValue()))
            .andExpect(jsonPath("$.seatRow").value(DEFAULT_SEAT_ROW))
            .andExpect(jsonPath("$.seatCol").value(DEFAULT_SEAT_COL));
    }

    @Test
    @Transactional
    public void getNonExistingFlightTicket() throws Exception {
        // Get the flightTicket
        restFlightTicketMockMvc.perform(get("/api/flight-tickets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFlightTicket() throws Exception {
        // Initialize the database
        flightTicketRepository.saveAndFlush(flightTicket);

        int databaseSizeBeforeUpdate = flightTicketRepository.findAll().size();

        // Update the flightTicket
        FlightTicket updatedFlightTicket = flightTicketRepository.findById(flightTicket.getId()).get();
        // Disconnect from session so that the updates on updatedFlightTicket are not directly saved in db
        em.detach(updatedFlightTicket);
        updatedFlightTicket
            .seatRow(UPDATED_SEAT_ROW)
            .seatCol(UPDATED_SEAT_COL);

        restFlightTicketMockMvc.perform(put("/api/flight-tickets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFlightTicket)))
            .andExpect(status().isOk());

        // Validate the FlightTicket in the database
        List<FlightTicket> flightTicketList = flightTicketRepository.findAll();
        assertThat(flightTicketList).hasSize(databaseSizeBeforeUpdate);
        FlightTicket testFlightTicket = flightTicketList.get(flightTicketList.size() - 1);
        assertThat(testFlightTicket.getSeatRow()).isEqualTo(UPDATED_SEAT_ROW);
        assertThat(testFlightTicket.getSeatCol()).isEqualTo(UPDATED_SEAT_COL);
    }

    @Test
    @Transactional
    public void updateNonExistingFlightTicket() throws Exception {
        int databaseSizeBeforeUpdate = flightTicketRepository.findAll().size();

        // Create the FlightTicket

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFlightTicketMockMvc.perform(put("/api/flight-tickets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flightTicket)))
            .andExpect(status().isBadRequest());

        // Validate the FlightTicket in the database
        List<FlightTicket> flightTicketList = flightTicketRepository.findAll();
        assertThat(flightTicketList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFlightTicket() throws Exception {
        // Initialize the database
        flightTicketRepository.saveAndFlush(flightTicket);

        int databaseSizeBeforeDelete = flightTicketRepository.findAll().size();

        // Get the flightTicket
        restFlightTicketMockMvc.perform(delete("/api/flight-tickets/{id}", flightTicket.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FlightTicket> flightTicketList = flightTicketRepository.findAll();
        assertThat(flightTicketList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FlightTicket.class);
        FlightTicket flightTicket1 = new FlightTicket();
        flightTicket1.setId(1L);
        FlightTicket flightTicket2 = new FlightTicket();
        flightTicket2.setId(flightTicket1.getId());
        assertThat(flightTicket1).isEqualTo(flightTicket2);
        flightTicket2.setId(2L);
        assertThat(flightTicket1).isNotEqualTo(flightTicket2);
        flightTicket1.setId(null);
        assertThat(flightTicket1).isNotEqualTo(flightTicket2);
    }
}
