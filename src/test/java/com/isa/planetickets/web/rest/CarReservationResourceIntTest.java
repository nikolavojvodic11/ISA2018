package com.isa.planetickets.web.rest;

import com.isa.planetickets.PlaneTicketsApp;

import com.isa.planetickets.domain.CarReservation;
import com.isa.planetickets.repository.CarReservationRepository;
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

/**
 * Test class for the CarReservationResource REST controller.
 *
 * @see CarReservationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PlaneTicketsApp.class)
public class CarReservationResourceIntTest {

    private static final Instant DEFAULT_DATE_FROM = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_FROM = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATE_TO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_TO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Double DEFAULT_PRICE = 1D;
    private static final Double UPDATED_PRICE = 2D;

    private static final Integer DEFAULT_DISCOUNT = 1;
    private static final Integer UPDATED_DISCOUNT = 2;

    private static final Integer DEFAULT_HOTEL_RATING = 1;
    private static final Integer UPDATED_HOTEL_RATING = 2;

    private static final Integer DEFAULT_ROOM_RATING = 1;
    private static final Integer UPDATED_ROOM_RATING = 2;

    private static final Boolean DEFAULT_DELETED = false;
    private static final Boolean UPDATED_DELETED = true;

    @Autowired
    private CarReservationRepository carReservationRepository;

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

    private MockMvc restCarReservationMockMvc;

    private CarReservation carReservation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CarReservationResource carReservationResource = new CarReservationResource(carReservationRepository);
        this.restCarReservationMockMvc = MockMvcBuilders.standaloneSetup(carReservationResource)
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
    public static CarReservation createEntity(EntityManager em) {
        CarReservation carReservation = new CarReservation()
            .dateFrom(DEFAULT_DATE_FROM)
            .dateTo(DEFAULT_DATE_TO)
            .price(DEFAULT_PRICE)
            .discount(DEFAULT_DISCOUNT)
            .hotelRating(DEFAULT_HOTEL_RATING)
            .roomRating(DEFAULT_ROOM_RATING)
            .deleted(DEFAULT_DELETED);
        return carReservation;
    }

    @Before
    public void initTest() {
        carReservation = createEntity(em);
    }

    @Test
    @Transactional
    public void createCarReservation() throws Exception {
        int databaseSizeBeforeCreate = carReservationRepository.findAll().size();

        // Create the CarReservation
        restCarReservationMockMvc.perform(post("/api/car-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carReservation)))
            .andExpect(status().isCreated());

        // Validate the CarReservation in the database
        List<CarReservation> carReservationList = carReservationRepository.findAll();
        assertThat(carReservationList).hasSize(databaseSizeBeforeCreate + 1);
        CarReservation testCarReservation = carReservationList.get(carReservationList.size() - 1);
        assertThat(testCarReservation.getDateFrom()).isEqualTo(DEFAULT_DATE_FROM);
        assertThat(testCarReservation.getDateTo()).isEqualTo(DEFAULT_DATE_TO);
        assertThat(testCarReservation.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testCarReservation.getDiscount()).isEqualTo(DEFAULT_DISCOUNT);
        assertThat(testCarReservation.getHotelRating()).isEqualTo(DEFAULT_HOTEL_RATING);
        assertThat(testCarReservation.getRoomRating()).isEqualTo(DEFAULT_ROOM_RATING);
        assertThat(testCarReservation.isDeleted()).isEqualTo(DEFAULT_DELETED);
    }

    @Test
    @Transactional
    public void createCarReservationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = carReservationRepository.findAll().size();

        // Create the CarReservation with an existing ID
        carReservation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCarReservationMockMvc.perform(post("/api/car-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carReservation)))
            .andExpect(status().isBadRequest());

        // Validate the CarReservation in the database
        List<CarReservation> carReservationList = carReservationRepository.findAll();
        assertThat(carReservationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCarReservations() throws Exception {
        // Initialize the database
        carReservationRepository.saveAndFlush(carReservation);

        // Get all the carReservationList
        restCarReservationMockMvc.perform(get("/api/car-reservations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(carReservation.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateFrom").value(hasItem(DEFAULT_DATE_FROM.toString())))
            .andExpect(jsonPath("$.[*].dateTo").value(hasItem(DEFAULT_DATE_TO.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].discount").value(hasItem(DEFAULT_DISCOUNT)))
            .andExpect(jsonPath("$.[*].hotelRating").value(hasItem(DEFAULT_HOTEL_RATING)))
            .andExpect(jsonPath("$.[*].roomRating").value(hasItem(DEFAULT_ROOM_RATING)))
            .andExpect(jsonPath("$.[*].deleted").value(hasItem(DEFAULT_DELETED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getCarReservation() throws Exception {
        // Initialize the database
        carReservationRepository.saveAndFlush(carReservation);

        // Get the carReservation
        restCarReservationMockMvc.perform(get("/api/car-reservations/{id}", carReservation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(carReservation.getId().intValue()))
            .andExpect(jsonPath("$.dateFrom").value(DEFAULT_DATE_FROM.toString()))
            .andExpect(jsonPath("$.dateTo").value(DEFAULT_DATE_TO.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.discount").value(DEFAULT_DISCOUNT))
            .andExpect(jsonPath("$.hotelRating").value(DEFAULT_HOTEL_RATING))
            .andExpect(jsonPath("$.roomRating").value(DEFAULT_ROOM_RATING))
            .andExpect(jsonPath("$.deleted").value(DEFAULT_DELETED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCarReservation() throws Exception {
        // Get the carReservation
        restCarReservationMockMvc.perform(get("/api/car-reservations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCarReservation() throws Exception {
        // Initialize the database
        carReservationRepository.saveAndFlush(carReservation);

        int databaseSizeBeforeUpdate = carReservationRepository.findAll().size();

        // Update the carReservation
        CarReservation updatedCarReservation = carReservationRepository.findById(carReservation.getId()).get();
        // Disconnect from session so that the updates on updatedCarReservation are not directly saved in db
        em.detach(updatedCarReservation);
        updatedCarReservation
            .dateFrom(UPDATED_DATE_FROM)
            .dateTo(UPDATED_DATE_TO)
            .price(UPDATED_PRICE)
            .discount(UPDATED_DISCOUNT)
            .hotelRating(UPDATED_HOTEL_RATING)
            .roomRating(UPDATED_ROOM_RATING)
            .deleted(UPDATED_DELETED);

        restCarReservationMockMvc.perform(put("/api/car-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCarReservation)))
            .andExpect(status().isOk());

        // Validate the CarReservation in the database
        List<CarReservation> carReservationList = carReservationRepository.findAll();
        assertThat(carReservationList).hasSize(databaseSizeBeforeUpdate);
        CarReservation testCarReservation = carReservationList.get(carReservationList.size() - 1);
        assertThat(testCarReservation.getDateFrom()).isEqualTo(UPDATED_DATE_FROM);
        assertThat(testCarReservation.getDateTo()).isEqualTo(UPDATED_DATE_TO);
        assertThat(testCarReservation.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testCarReservation.getDiscount()).isEqualTo(UPDATED_DISCOUNT);
        assertThat(testCarReservation.getHotelRating()).isEqualTo(UPDATED_HOTEL_RATING);
        assertThat(testCarReservation.getRoomRating()).isEqualTo(UPDATED_ROOM_RATING);
        assertThat(testCarReservation.isDeleted()).isEqualTo(UPDATED_DELETED);
    }

    @Test
    @Transactional
    public void updateNonExistingCarReservation() throws Exception {
        int databaseSizeBeforeUpdate = carReservationRepository.findAll().size();

        // Create the CarReservation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCarReservationMockMvc.perform(put("/api/car-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carReservation)))
            .andExpect(status().isBadRequest());

        // Validate the CarReservation in the database
        List<CarReservation> carReservationList = carReservationRepository.findAll();
        assertThat(carReservationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCarReservation() throws Exception {
        // Initialize the database
        carReservationRepository.saveAndFlush(carReservation);

        int databaseSizeBeforeDelete = carReservationRepository.findAll().size();

        // Get the carReservation
        restCarReservationMockMvc.perform(delete("/api/car-reservations/{id}", carReservation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CarReservation> carReservationList = carReservationRepository.findAll();
        assertThat(carReservationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CarReservation.class);
        CarReservation carReservation1 = new CarReservation();
        carReservation1.setId(1L);
        CarReservation carReservation2 = new CarReservation();
        carReservation2.setId(carReservation1.getId());
        assertThat(carReservation1).isEqualTo(carReservation2);
        carReservation2.setId(2L);
        assertThat(carReservation1).isNotEqualTo(carReservation2);
        carReservation1.setId(null);
        assertThat(carReservation1).isNotEqualTo(carReservation2);
    }
}
