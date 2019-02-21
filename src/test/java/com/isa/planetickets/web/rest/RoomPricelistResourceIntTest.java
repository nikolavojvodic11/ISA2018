package com.isa.planetickets.web.rest;

import com.isa.planetickets.PlaneTicketsApp;

import com.isa.planetickets.domain.RoomPricelist;
import com.isa.planetickets.repository.RoomPricelistRepository;
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
 * Test class for the RoomPricelistResource REST controller.
 *
 * @see RoomPricelistResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PlaneTicketsApp.class)
public class RoomPricelistResourceIntTest {

    private static final Instant DEFAULT_DATE_FROM = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_FROM = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATE_TO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_TO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Double DEFAULT_PRICE = 1D;
    private static final Double UPDATED_PRICE = 2D;

    @Autowired
    private RoomPricelistRepository roomPricelistRepository;

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

    private MockMvc restRoomPricelistMockMvc;

    private RoomPricelist roomPricelist;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RoomPricelistResource roomPricelistResource = new RoomPricelistResource(roomPricelistRepository);
        this.restRoomPricelistMockMvc = MockMvcBuilders.standaloneSetup(roomPricelistResource)
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
    public static RoomPricelist createEntity(EntityManager em) {
        RoomPricelist roomPricelist = new RoomPricelist()
            .dateFrom(DEFAULT_DATE_FROM)
            .dateTo(DEFAULT_DATE_TO)
            .price(DEFAULT_PRICE);
        return roomPricelist;
    }

    @Before
    public void initTest() {
        roomPricelist = createEntity(em);
    }

    @Test
    @Transactional
    public void createRoomPricelist() throws Exception {
        int databaseSizeBeforeCreate = roomPricelistRepository.findAll().size();

        // Create the RoomPricelist
        restRoomPricelistMockMvc.perform(post("/api/room-pricelists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roomPricelist)))
            .andExpect(status().isCreated());

        // Validate the RoomPricelist in the database
        List<RoomPricelist> roomPricelistList = roomPricelistRepository.findAll();
        assertThat(roomPricelistList).hasSize(databaseSizeBeforeCreate + 1);
        RoomPricelist testRoomPricelist = roomPricelistList.get(roomPricelistList.size() - 1);
        assertThat(testRoomPricelist.getDateFrom()).isEqualTo(DEFAULT_DATE_FROM);
        assertThat(testRoomPricelist.getDateTo()).isEqualTo(DEFAULT_DATE_TO);
        assertThat(testRoomPricelist.getPrice()).isEqualTo(DEFAULT_PRICE);
    }

    @Test
    @Transactional
    public void createRoomPricelistWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = roomPricelistRepository.findAll().size();

        // Create the RoomPricelist with an existing ID
        roomPricelist.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRoomPricelistMockMvc.perform(post("/api/room-pricelists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roomPricelist)))
            .andExpect(status().isBadRequest());

        // Validate the RoomPricelist in the database
        List<RoomPricelist> roomPricelistList = roomPricelistRepository.findAll();
        assertThat(roomPricelistList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRoomPricelists() throws Exception {
        // Initialize the database
        roomPricelistRepository.saveAndFlush(roomPricelist);

        // Get all the roomPricelistList
        restRoomPricelistMockMvc.perform(get("/api/room-pricelists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(roomPricelist.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateFrom").value(hasItem(DEFAULT_DATE_FROM.toString())))
            .andExpect(jsonPath("$.[*].dateTo").value(hasItem(DEFAULT_DATE_TO.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getRoomPricelist() throws Exception {
        // Initialize the database
        roomPricelistRepository.saveAndFlush(roomPricelist);

        // Get the roomPricelist
        restRoomPricelistMockMvc.perform(get("/api/room-pricelists/{id}", roomPricelist.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(roomPricelist.getId().intValue()))
            .andExpect(jsonPath("$.dateFrom").value(DEFAULT_DATE_FROM.toString()))
            .andExpect(jsonPath("$.dateTo").value(DEFAULT_DATE_TO.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRoomPricelist() throws Exception {
        // Get the roomPricelist
        restRoomPricelistMockMvc.perform(get("/api/room-pricelists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRoomPricelist() throws Exception {
        // Initialize the database
        roomPricelistRepository.saveAndFlush(roomPricelist);

        int databaseSizeBeforeUpdate = roomPricelistRepository.findAll().size();

        // Update the roomPricelist
        RoomPricelist updatedRoomPricelist = roomPricelistRepository.findById(roomPricelist.getId()).get();
        // Disconnect from session so that the updates on updatedRoomPricelist are not directly saved in db
        em.detach(updatedRoomPricelist);
        updatedRoomPricelist
            .dateFrom(UPDATED_DATE_FROM)
            .dateTo(UPDATED_DATE_TO)
            .price(UPDATED_PRICE);

        restRoomPricelistMockMvc.perform(put("/api/room-pricelists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRoomPricelist)))
            .andExpect(status().isOk());

        // Validate the RoomPricelist in the database
        List<RoomPricelist> roomPricelistList = roomPricelistRepository.findAll();
        assertThat(roomPricelistList).hasSize(databaseSizeBeforeUpdate);
        RoomPricelist testRoomPricelist = roomPricelistList.get(roomPricelistList.size() - 1);
        assertThat(testRoomPricelist.getDateFrom()).isEqualTo(UPDATED_DATE_FROM);
        assertThat(testRoomPricelist.getDateTo()).isEqualTo(UPDATED_DATE_TO);
        assertThat(testRoomPricelist.getPrice()).isEqualTo(UPDATED_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingRoomPricelist() throws Exception {
        int databaseSizeBeforeUpdate = roomPricelistRepository.findAll().size();

        // Create the RoomPricelist

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRoomPricelistMockMvc.perform(put("/api/room-pricelists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roomPricelist)))
            .andExpect(status().isBadRequest());

        // Validate the RoomPricelist in the database
        List<RoomPricelist> roomPricelistList = roomPricelistRepository.findAll();
        assertThat(roomPricelistList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRoomPricelist() throws Exception {
        // Initialize the database
        roomPricelistRepository.saveAndFlush(roomPricelist);

        int databaseSizeBeforeDelete = roomPricelistRepository.findAll().size();

        // Get the roomPricelist
        restRoomPricelistMockMvc.perform(delete("/api/room-pricelists/{id}", roomPricelist.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RoomPricelist> roomPricelistList = roomPricelistRepository.findAll();
        assertThat(roomPricelistList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RoomPricelist.class);
        RoomPricelist roomPricelist1 = new RoomPricelist();
        roomPricelist1.setId(1L);
        RoomPricelist roomPricelist2 = new RoomPricelist();
        roomPricelist2.setId(roomPricelist1.getId());
        assertThat(roomPricelist1).isEqualTo(roomPricelist2);
        roomPricelist2.setId(2L);
        assertThat(roomPricelist1).isNotEqualTo(roomPricelist2);
        roomPricelist1.setId(null);
        assertThat(roomPricelist1).isNotEqualTo(roomPricelist2);
    }
}
