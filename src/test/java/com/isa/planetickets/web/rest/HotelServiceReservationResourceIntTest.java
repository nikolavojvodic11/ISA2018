package com.isa.planetickets.web.rest;

import com.isa.planetickets.PlaneTicketsApp;

import com.isa.planetickets.domain.HotelServiceReservation;
import com.isa.planetickets.repository.HotelServiceReservationRepository;
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
 * Test class for the HotelServiceReservationResource REST controller.
 *
 * @see HotelServiceReservationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PlaneTicketsApp.class)
public class HotelServiceReservationResourceIntTest {

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    private static final Double DEFAULT_PRICE = 1D;
    private static final Double UPDATED_PRICE = 2D;

    private static final ReservationStatus DEFAULT_STATUS = ReservationStatus.RESERVED;
    private static final ReservationStatus UPDATED_STATUS = ReservationStatus.CONFIRMED;

    private static final Boolean DEFAULT_DELETED = false;
    private static final Boolean UPDATED_DELETED = true;

    @Autowired
    private HotelServiceReservationRepository hotelServiceReservationRepository;

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

    private MockMvc restHotelServiceReservationMockMvc;

    private HotelServiceReservation hotelServiceReservation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HotelServiceReservationResource hotelServiceReservationResource = new HotelServiceReservationResource(hotelServiceReservationRepository);
        this.restHotelServiceReservationMockMvc = MockMvcBuilders.standaloneSetup(hotelServiceReservationResource)
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
    public static HotelServiceReservation createEntity(EntityManager em) {
        HotelServiceReservation hotelServiceReservation = new HotelServiceReservation()
            .quantity(DEFAULT_QUANTITY)
            .price(DEFAULT_PRICE)
            .status(DEFAULT_STATUS)
            .deleted(DEFAULT_DELETED);
        return hotelServiceReservation;
    }

    @Before
    public void initTest() {
        hotelServiceReservation = createEntity(em);
    }

    @Test
    @Transactional
    public void createHotelServiceReservation() throws Exception {
        int databaseSizeBeforeCreate = hotelServiceReservationRepository.findAll().size();

        // Create the HotelServiceReservation
        restHotelServiceReservationMockMvc.perform(post("/api/hotel-service-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hotelServiceReservation)))
            .andExpect(status().isCreated());

        // Validate the HotelServiceReservation in the database
        List<HotelServiceReservation> hotelServiceReservationList = hotelServiceReservationRepository.findAll();
        assertThat(hotelServiceReservationList).hasSize(databaseSizeBeforeCreate + 1);
        HotelServiceReservation testHotelServiceReservation = hotelServiceReservationList.get(hotelServiceReservationList.size() - 1);
        assertThat(testHotelServiceReservation.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testHotelServiceReservation.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testHotelServiceReservation.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testHotelServiceReservation.isDeleted()).isEqualTo(DEFAULT_DELETED);
    }

    @Test
    @Transactional
    public void createHotelServiceReservationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = hotelServiceReservationRepository.findAll().size();

        // Create the HotelServiceReservation with an existing ID
        hotelServiceReservation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHotelServiceReservationMockMvc.perform(post("/api/hotel-service-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hotelServiceReservation)))
            .andExpect(status().isBadRequest());

        // Validate the HotelServiceReservation in the database
        List<HotelServiceReservation> hotelServiceReservationList = hotelServiceReservationRepository.findAll();
        assertThat(hotelServiceReservationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllHotelServiceReservations() throws Exception {
        // Initialize the database
        hotelServiceReservationRepository.saveAndFlush(hotelServiceReservation);

        // Get all the hotelServiceReservationList
        restHotelServiceReservationMockMvc.perform(get("/api/hotel-service-reservations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(hotelServiceReservation.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].deleted").value(hasItem(DEFAULT_DELETED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getHotelServiceReservation() throws Exception {
        // Initialize the database
        hotelServiceReservationRepository.saveAndFlush(hotelServiceReservation);

        // Get the hotelServiceReservation
        restHotelServiceReservationMockMvc.perform(get("/api/hotel-service-reservations/{id}", hotelServiceReservation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(hotelServiceReservation.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.deleted").value(DEFAULT_DELETED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingHotelServiceReservation() throws Exception {
        // Get the hotelServiceReservation
        restHotelServiceReservationMockMvc.perform(get("/api/hotel-service-reservations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHotelServiceReservation() throws Exception {
        // Initialize the database
        hotelServiceReservationRepository.saveAndFlush(hotelServiceReservation);

        int databaseSizeBeforeUpdate = hotelServiceReservationRepository.findAll().size();

        // Update the hotelServiceReservation
        HotelServiceReservation updatedHotelServiceReservation = hotelServiceReservationRepository.findById(hotelServiceReservation.getId()).get();
        // Disconnect from session so that the updates on updatedHotelServiceReservation are not directly saved in db
        em.detach(updatedHotelServiceReservation);
        updatedHotelServiceReservation
            .quantity(UPDATED_QUANTITY)
            .price(UPDATED_PRICE)
            .status(UPDATED_STATUS)
            .deleted(UPDATED_DELETED);

        restHotelServiceReservationMockMvc.perform(put("/api/hotel-service-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHotelServiceReservation)))
            .andExpect(status().isOk());

        // Validate the HotelServiceReservation in the database
        List<HotelServiceReservation> hotelServiceReservationList = hotelServiceReservationRepository.findAll();
        assertThat(hotelServiceReservationList).hasSize(databaseSizeBeforeUpdate);
        HotelServiceReservation testHotelServiceReservation = hotelServiceReservationList.get(hotelServiceReservationList.size() - 1);
        assertThat(testHotelServiceReservation.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testHotelServiceReservation.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testHotelServiceReservation.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testHotelServiceReservation.isDeleted()).isEqualTo(UPDATED_DELETED);
    }

    @Test
    @Transactional
    public void updateNonExistingHotelServiceReservation() throws Exception {
        int databaseSizeBeforeUpdate = hotelServiceReservationRepository.findAll().size();

        // Create the HotelServiceReservation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHotelServiceReservationMockMvc.perform(put("/api/hotel-service-reservations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hotelServiceReservation)))
            .andExpect(status().isBadRequest());

        // Validate the HotelServiceReservation in the database
        List<HotelServiceReservation> hotelServiceReservationList = hotelServiceReservationRepository.findAll();
        assertThat(hotelServiceReservationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHotelServiceReservation() throws Exception {
        // Initialize the database
        hotelServiceReservationRepository.saveAndFlush(hotelServiceReservation);

        int databaseSizeBeforeDelete = hotelServiceReservationRepository.findAll().size();

        // Get the hotelServiceReservation
        restHotelServiceReservationMockMvc.perform(delete("/api/hotel-service-reservations/{id}", hotelServiceReservation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<HotelServiceReservation> hotelServiceReservationList = hotelServiceReservationRepository.findAll();
        assertThat(hotelServiceReservationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HotelServiceReservation.class);
        HotelServiceReservation hotelServiceReservation1 = new HotelServiceReservation();
        hotelServiceReservation1.setId(1L);
        HotelServiceReservation hotelServiceReservation2 = new HotelServiceReservation();
        hotelServiceReservation2.setId(hotelServiceReservation1.getId());
        assertThat(hotelServiceReservation1).isEqualTo(hotelServiceReservation2);
        hotelServiceReservation2.setId(2L);
        assertThat(hotelServiceReservation1).isNotEqualTo(hotelServiceReservation2);
        hotelServiceReservation1.setId(null);
        assertThat(hotelServiceReservation1).isNotEqualTo(hotelServiceReservation2);
    }
}
