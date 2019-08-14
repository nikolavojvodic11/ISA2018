package com.isa.planetickets.web.rest;

import com.isa.planetickets.PlaneTicketsApp;

import com.isa.planetickets.domain.Seat;
import com.isa.planetickets.repository.SeatRepository;
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
 * Test class for the SeatResource REST controller.
 *
 * @see SeatResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PlaneTicketsApp.class)
public class SeatResourceIntTest {

    private static final Integer DEFAULT_ROW = 1;
    private static final Integer UPDATED_ROW = 2;

    private static final Integer DEFAULT_COL = 1;
    private static final Integer UPDATED_COL = 2;

    private static final Boolean DEFAULT_DELETED = false;
    private static final Boolean UPDATED_DELETED = true;

    @Autowired
    private SeatRepository seatRepository;

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

    private MockMvc restSeatMockMvc;

    private Seat seat;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SeatResource seatResource = new SeatResource(seatRepository);
        this.restSeatMockMvc = MockMvcBuilders.standaloneSetup(seatResource)
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
    public static Seat createEntity(EntityManager em) {
        Seat seat = new Seat()
            .row(DEFAULT_ROW)
            .col(DEFAULT_COL)
            .deleted(DEFAULT_DELETED);
        return seat;
    }

    @Before
    public void initTest() {
        seat = createEntity(em);
    }

    @Test
    @Transactional
    public void createSeat() throws Exception {
        int databaseSizeBeforeCreate = seatRepository.findAll().size();

        // Create the Seat
        restSeatMockMvc.perform(post("/api/seats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seat)))
            .andExpect(status().isCreated());

        // Validate the Seat in the database
        List<Seat> seatList = seatRepository.findAll();
        assertThat(seatList).hasSize(databaseSizeBeforeCreate + 1);
        Seat testSeat = seatList.get(seatList.size() - 1);
        assertThat(testSeat.getRow()).isEqualTo(DEFAULT_ROW);
        assertThat(testSeat.getCol()).isEqualTo(DEFAULT_COL);
        assertThat(testSeat.isDeleted()).isEqualTo(DEFAULT_DELETED);
    }

    @Test
    @Transactional
    public void createSeatWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = seatRepository.findAll().size();

        // Create the Seat with an existing ID
        seat.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSeatMockMvc.perform(post("/api/seats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seat)))
            .andExpect(status().isBadRequest());

        // Validate the Seat in the database
        List<Seat> seatList = seatRepository.findAll();
        assertThat(seatList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSeats() throws Exception {
        // Initialize the database
        seatRepository.saveAndFlush(seat);

        // Get all the seatList
        restSeatMockMvc.perform(get("/api/seats?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(seat.getId().intValue())))
            .andExpect(jsonPath("$.[*].row").value(hasItem(DEFAULT_ROW)))
            .andExpect(jsonPath("$.[*].col").value(hasItem(DEFAULT_COL)))
            .andExpect(jsonPath("$.[*].deleted").value(hasItem(DEFAULT_DELETED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getSeat() throws Exception {
        // Initialize the database
        seatRepository.saveAndFlush(seat);

        // Get the seat
        restSeatMockMvc.perform(get("/api/seats/{id}", seat.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(seat.getId().intValue()))
            .andExpect(jsonPath("$.row").value(DEFAULT_ROW))
            .andExpect(jsonPath("$.col").value(DEFAULT_COL))
            .andExpect(jsonPath("$.deleted").value(DEFAULT_DELETED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSeat() throws Exception {
        // Get the seat
        restSeatMockMvc.perform(get("/api/seats/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSeat() throws Exception {
        // Initialize the database
        seatRepository.saveAndFlush(seat);

        int databaseSizeBeforeUpdate = seatRepository.findAll().size();

        // Update the seat
        Seat updatedSeat = seatRepository.findById(seat.getId()).get();
        // Disconnect from session so that the updates on updatedSeat are not directly saved in db
        em.detach(updatedSeat);
        updatedSeat
            .row(UPDATED_ROW)
            .col(UPDATED_COL)
            .deleted(UPDATED_DELETED);

        restSeatMockMvc.perform(put("/api/seats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSeat)))
            .andExpect(status().isOk());

        // Validate the Seat in the database
        List<Seat> seatList = seatRepository.findAll();
        assertThat(seatList).hasSize(databaseSizeBeforeUpdate);
        Seat testSeat = seatList.get(seatList.size() - 1);
        assertThat(testSeat.getRow()).isEqualTo(UPDATED_ROW);
        assertThat(testSeat.getCol()).isEqualTo(UPDATED_COL);
        assertThat(testSeat.isDeleted()).isEqualTo(UPDATED_DELETED);
    }

    @Test
    @Transactional
    public void updateNonExistingSeat() throws Exception {
        int databaseSizeBeforeUpdate = seatRepository.findAll().size();

        // Create the Seat

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSeatMockMvc.perform(put("/api/seats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seat)))
            .andExpect(status().isBadRequest());

        // Validate the Seat in the database
        List<Seat> seatList = seatRepository.findAll();
        assertThat(seatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSeat() throws Exception {
        // Initialize the database
        seatRepository.saveAndFlush(seat);

        int databaseSizeBeforeDelete = seatRepository.findAll().size();

        // Get the seat
        restSeatMockMvc.perform(delete("/api/seats/{id}", seat.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Seat> seatList = seatRepository.findAll();
        assertThat(seatList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Seat.class);
        Seat seat1 = new Seat();
        seat1.setId(1L);
        Seat seat2 = new Seat();
        seat2.setId(seat1.getId());
        assertThat(seat1).isEqualTo(seat2);
        seat2.setId(2L);
        assertThat(seat1).isNotEqualTo(seat2);
        seat1.setId(null);
        assertThat(seat1).isNotEqualTo(seat2);
    }
}
