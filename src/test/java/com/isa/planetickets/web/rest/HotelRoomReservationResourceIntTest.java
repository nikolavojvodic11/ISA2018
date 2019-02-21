package com.isa.planetickets.web.rest;

import com.isa.planetickets.PlaneTicketsApp;

import com.isa.planetickets.domain.HotelRoomReservation;
import com.isa.planetickets.repository.HotelRoomReservationRepository;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.isa.planetickets.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.isa.planetickets.domain.enumeration.ReservationStatus;
/**
 * Test class for the HotelRoomReservationResource REST controller.
 *
 * @see HotelRoomReservationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PlaneTicketsApp.class)
public class HotelRoomReservationResourceIntTest {

    private static final Instant DEFAULT_DATE_FROM = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_FROM = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATE_TO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_TO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final ReservationStatus DEFAULT_STATUS = ReservationStatus.RESERVED;
    private static final ReservationStatus UPDATED_STATUS = ReservationStatus.CONFIRMED;

    private static final Double DEFAULT_PRICE = 1D;
    private static final Double UPDATED_PRICE = 2D;

    @Autowired
    private HotelRoomReservationRepository hotelRoomReservationRepository;

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

    private MockMvc restHotelRoomReservationMockMvc;

    private HotelRoomReservation hotelRoomReservation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HotelRoomReservationResource hotelRoomReservationResource = new HotelRoomReservationResource(hotelRoomReservationRepository);
        this.restHotelRoomReservationMockMvc = MockMvcBuilders.standaloneSetup(hotelRoomReservationResource)
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
    public static HotelRoomReservation createEntity(EntityManager em) {
        HotelRoomReservation hotelRoomReservation = new HotelRoomReservation()
            .dateFrom(DEFAULT_DATE_FROM)
            .dateTo(DEFAULT_DATE_TO)
            .status(DEFAULT_STATUS)
            .price(DEFAULT_PRICE);
        return hotelRoomReservation;
    }

    @Before
    public void initTest() {
        hotelRoomReservation = createEntity(em);
    }

    @Test
    @Transactional
    public void createHotelRoomReservation() throws Exception {
        int databaseSizeBeforeCreate = hotelRoomReservationRepository.findAll().size();

        // Create the HotelRoomReservation
        restHotelRoomReservationMockMvc.perform(post("/api/hotel-room-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hotelRoomReservation)))
            .andExpect(status().isCreated());

        // Validate the HotelRoomReservation in the database
        List<HotelRoomReservation> hotelRoomReservationList = hotelRoomReservationRepository.findAll();
        assertThat(hotelRoomReservationList).hasSize(databaseSizeBeforeCreate + 1);
        HotelRoomReservation testHotelRoomReservation = hotelRoomReservationList.get(hotelRoomReservationList.size() - 1);
        assertThat(testHotelRoomReservation.getDateFrom()).isEqualTo(DEFAULT_DATE_FROM);
        assertThat(testHotelRoomReservation.getDateTo()).isEqualTo(DEFAULT_DATE_TO);
        assertThat(testHotelRoomReservation.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testHotelRoomReservation.getPrice()).isEqualTo(DEFAULT_PRICE);
    }

    @Test
    @Transactional
    public void createHotelRoomReservationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = hotelRoomReservationRepository.findAll().size();

        // Create the HotelRoomReservation with an existing ID
        hotelRoomReservation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHotelRoomReservationMockMvc.perform(post("/api/hotel-room-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hotelRoomReservation)))
            .andExpect(status().isBadRequest());

        // Validate the HotelRoomReservation in the database
        List<HotelRoomReservation> hotelRoomReservationList = hotelRoomReservationRepository.findAll();
        assertThat(hotelRoomReservationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllHotelRoomReservations() throws Exception {
        // Initialize the database
        hotelRoomReservationRepository.saveAndFlush(hotelRoomReservation);

        // Get all the hotelRoomReservationList
        restHotelRoomReservationMockMvc.perform(get("/api/hotel-room-reservations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(hotelRoomReservation.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateFrom").value(hasItem(DEFAULT_DATE_FROM.toString())))
            .andExpect(jsonPath("$.[*].dateTo").value(hasItem(DEFAULT_DATE_TO.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getHotelRoomReservation() throws Exception {
        // Initialize the database
        hotelRoomReservationRepository.saveAndFlush(hotelRoomReservation);

        // Get the hotelRoomReservation
        restHotelRoomReservationMockMvc.perform(get("/api/hotel-room-reservations/{id}", hotelRoomReservation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(hotelRoomReservation.getId().intValue()))
            .andExpect(jsonPath("$.dateFrom").value(DEFAULT_DATE_FROM.toString()))
            .andExpect(jsonPath("$.dateTo").value(DEFAULT_DATE_TO.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingHotelRoomReservation() throws Exception {
        // Get the hotelRoomReservation
        restHotelRoomReservationMockMvc.perform(get("/api/hotel-room-reservations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHotelRoomReservation() throws Exception {
        // Initialize the database
        hotelRoomReservationRepository.saveAndFlush(hotelRoomReservation);

        int databaseSizeBeforeUpdate = hotelRoomReservationRepository.findAll().size();

        // Update the hotelRoomReservation
        HotelRoomReservation updatedHotelRoomReservation = hotelRoomReservationRepository.findById(hotelRoomReservation.getId()).get();
        // Disconnect from session so that the updates on updatedHotelRoomReservation are not directly saved in db
        em.detach(updatedHotelRoomReservation);
        updatedHotelRoomReservation
            .dateFrom(UPDATED_DATE_FROM)
            .dateTo(UPDATED_DATE_TO)
            .status(UPDATED_STATUS)
            .price(UPDATED_PRICE);

        restHotelRoomReservationMockMvc.perform(put("/api/hotel-room-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHotelRoomReservation)))
            .andExpect(status().isOk());

        // Validate the HotelRoomReservation in the database
        List<HotelRoomReservation> hotelRoomReservationList = hotelRoomReservationRepository.findAll();
        assertThat(hotelRoomReservationList).hasSize(databaseSizeBeforeUpdate);
        HotelRoomReservation testHotelRoomReservation = hotelRoomReservationList.get(hotelRoomReservationList.size() - 1);
        assertThat(testHotelRoomReservation.getDateFrom()).isEqualTo(UPDATED_DATE_FROM);
        assertThat(testHotelRoomReservation.getDateTo()).isEqualTo(UPDATED_DATE_TO);
        assertThat(testHotelRoomReservation.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testHotelRoomReservation.getPrice()).isEqualTo(UPDATED_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingHotelRoomReservation() throws Exception {
        int databaseSizeBeforeUpdate = hotelRoomReservationRepository.findAll().size();

        // Create the HotelRoomReservation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHotelRoomReservationMockMvc.perform(put("/api/hotel-room-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hotelRoomReservation)))
            .andExpect(status().isBadRequest());

        // Validate the HotelRoomReservation in the database
        List<HotelRoomReservation> hotelRoomReservationList = hotelRoomReservationRepository.findAll();
        assertThat(hotelRoomReservationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHotelRoomReservation() throws Exception {
        // Initialize the database
        hotelRoomReservationRepository.saveAndFlush(hotelRoomReservation);

        int databaseSizeBeforeDelete = hotelRoomReservationRepository.findAll().size();

        // Get the hotelRoomReservation
        restHotelRoomReservationMockMvc.perform(delete("/api/hotel-room-reservations/{id}", hotelRoomReservation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<HotelRoomReservation> hotelRoomReservationList = hotelRoomReservationRepository.findAll();
        assertThat(hotelRoomReservationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HotelRoomReservation.class);
        HotelRoomReservation hotelRoomReservation1 = new HotelRoomReservation();
        hotelRoomReservation1.setId(1L);
        HotelRoomReservation hotelRoomReservation2 = new HotelRoomReservation();
        hotelRoomReservation2.setId(hotelRoomReservation1.getId());
        assertThat(hotelRoomReservation1).isEqualTo(hotelRoomReservation2);
        hotelRoomReservation2.setId(2L);
        assertThat(hotelRoomReservation1).isNotEqualTo(hotelRoomReservation2);
        hotelRoomReservation1.setId(null);
        assertThat(hotelRoomReservation1).isNotEqualTo(hotelRoomReservation2);
    }
}
