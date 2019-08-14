package com.isa.planetickets.web.rest;

import com.isa.planetickets.PlaneTicketsApp;

import com.isa.planetickets.domain.Plane;
import com.isa.planetickets.repository.PlaneRepository;
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
 * Test class for the PlaneResource REST controller.
 *
 * @see PlaneResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PlaneTicketsApp.class)
public class PlaneResourceIntTest {

    private static final String DEFAULT_MANUFACTURER = "AAAAAAAAAA";
    private static final String UPDATED_MANUFACTURER = "BBBBBBBBBB";

    private static final String DEFAULT_MODEL = "AAAAAAAAAA";
    private static final String UPDATED_MODEL = "BBBBBBBBBB";

    private static final String DEFAULT_REGISTRATION = "AAAAAAAAAA";
    private static final String UPDATED_REGISTRATION = "BBBBBBBBBB";

    private static final Integer DEFAULT_ROWS_COUNT = 1;
    private static final Integer UPDATED_ROWS_COUNT = 2;

    private static final Integer DEFAULT_COLS_COUNT = 1;
    private static final Integer UPDATED_COLS_COUNT = 2;

    private static final Boolean DEFAULT_DELETED = false;
    private static final Boolean UPDATED_DELETED = true;

    @Autowired
    private PlaneRepository planeRepository;

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

    private MockMvc restPlaneMockMvc;

    private Plane plane;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlaneResource planeResource = new PlaneResource(planeRepository);
        this.restPlaneMockMvc = MockMvcBuilders.standaloneSetup(planeResource)
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
    public static Plane createEntity(EntityManager em) {
        Plane plane = new Plane()
            .manufacturer(DEFAULT_MANUFACTURER)
            .model(DEFAULT_MODEL)
            .registration(DEFAULT_REGISTRATION)
            .rowsCount(DEFAULT_ROWS_COUNT)
            .colsCount(DEFAULT_COLS_COUNT)
            .deleted(DEFAULT_DELETED);
        return plane;
    }

    @Before
    public void initTest() {
        plane = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlane() throws Exception {
        int databaseSizeBeforeCreate = planeRepository.findAll().size();

        // Create the Plane
        restPlaneMockMvc.perform(post("/api/planes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plane)))
            .andExpect(status().isCreated());

        // Validate the Plane in the database
        List<Plane> planeList = planeRepository.findAll();
        assertThat(planeList).hasSize(databaseSizeBeforeCreate + 1);
        Plane testPlane = planeList.get(planeList.size() - 1);
        assertThat(testPlane.getManufacturer()).isEqualTo(DEFAULT_MANUFACTURER);
        assertThat(testPlane.getModel()).isEqualTo(DEFAULT_MODEL);
        assertThat(testPlane.getRegistration()).isEqualTo(DEFAULT_REGISTRATION);
        assertThat(testPlane.getRowsCount()).isEqualTo(DEFAULT_ROWS_COUNT);
        assertThat(testPlane.getColsCount()).isEqualTo(DEFAULT_COLS_COUNT);
        assertThat(testPlane.isDeleted()).isEqualTo(DEFAULT_DELETED);
    }

    @Test
    @Transactional
    public void createPlaneWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = planeRepository.findAll().size();

        // Create the Plane with an existing ID
        plane.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlaneMockMvc.perform(post("/api/planes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plane)))
            .andExpect(status().isBadRequest());

        // Validate the Plane in the database
        List<Plane> planeList = planeRepository.findAll();
        assertThat(planeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPlanes() throws Exception {
        // Initialize the database
        planeRepository.saveAndFlush(plane);

        // Get all the planeList
        restPlaneMockMvc.perform(get("/api/planes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(plane.getId().intValue())))
            .andExpect(jsonPath("$.[*].manufacturer").value(hasItem(DEFAULT_MANUFACTURER.toString())))
            .andExpect(jsonPath("$.[*].model").value(hasItem(DEFAULT_MODEL.toString())))
            .andExpect(jsonPath("$.[*].registration").value(hasItem(DEFAULT_REGISTRATION.toString())))
            .andExpect(jsonPath("$.[*].rowsCount").value(hasItem(DEFAULT_ROWS_COUNT)))
            .andExpect(jsonPath("$.[*].colsCount").value(hasItem(DEFAULT_COLS_COUNT)))
            .andExpect(jsonPath("$.[*].deleted").value(hasItem(DEFAULT_DELETED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getPlane() throws Exception {
        // Initialize the database
        planeRepository.saveAndFlush(plane);

        // Get the plane
        restPlaneMockMvc.perform(get("/api/planes/{id}", plane.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(plane.getId().intValue()))
            .andExpect(jsonPath("$.manufacturer").value(DEFAULT_MANUFACTURER.toString()))
            .andExpect(jsonPath("$.model").value(DEFAULT_MODEL.toString()))
            .andExpect(jsonPath("$.registration").value(DEFAULT_REGISTRATION.toString()))
            .andExpect(jsonPath("$.rowsCount").value(DEFAULT_ROWS_COUNT))
            .andExpect(jsonPath("$.colsCount").value(DEFAULT_COLS_COUNT))
            .andExpect(jsonPath("$.deleted").value(DEFAULT_DELETED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPlane() throws Exception {
        // Get the plane
        restPlaneMockMvc.perform(get("/api/planes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlane() throws Exception {
        // Initialize the database
        planeRepository.saveAndFlush(plane);

        int databaseSizeBeforeUpdate = planeRepository.findAll().size();

        // Update the plane
        Plane updatedPlane = planeRepository.findById(plane.getId()).get();
        // Disconnect from session so that the updates on updatedPlane are not directly saved in db
        em.detach(updatedPlane);
        updatedPlane
            .manufacturer(UPDATED_MANUFACTURER)
            .model(UPDATED_MODEL)
            .registration(UPDATED_REGISTRATION)
            .rowsCount(UPDATED_ROWS_COUNT)
            .colsCount(UPDATED_COLS_COUNT)
            .deleted(UPDATED_DELETED);

        restPlaneMockMvc.perform(put("/api/planes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlane)))
            .andExpect(status().isOk());

        // Validate the Plane in the database
        List<Plane> planeList = planeRepository.findAll();
        assertThat(planeList).hasSize(databaseSizeBeforeUpdate);
        Plane testPlane = planeList.get(planeList.size() - 1);
        assertThat(testPlane.getManufacturer()).isEqualTo(UPDATED_MANUFACTURER);
        assertThat(testPlane.getModel()).isEqualTo(UPDATED_MODEL);
        assertThat(testPlane.getRegistration()).isEqualTo(UPDATED_REGISTRATION);
        assertThat(testPlane.getRowsCount()).isEqualTo(UPDATED_ROWS_COUNT);
        assertThat(testPlane.getColsCount()).isEqualTo(UPDATED_COLS_COUNT);
        assertThat(testPlane.isDeleted()).isEqualTo(UPDATED_DELETED);
    }

    @Test
    @Transactional
    public void updateNonExistingPlane() throws Exception {
        int databaseSizeBeforeUpdate = planeRepository.findAll().size();

        // Create the Plane

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlaneMockMvc.perform(put("/api/planes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plane)))
            .andExpect(status().isBadRequest());

        // Validate the Plane in the database
        List<Plane> planeList = planeRepository.findAll();
        assertThat(planeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlane() throws Exception {
        // Initialize the database
        planeRepository.saveAndFlush(plane);

        int databaseSizeBeforeDelete = planeRepository.findAll().size();

        // Get the plane
        restPlaneMockMvc.perform(delete("/api/planes/{id}", plane.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Plane> planeList = planeRepository.findAll();
        assertThat(planeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Plane.class);
        Plane plane1 = new Plane();
        plane1.setId(1L);
        Plane plane2 = new Plane();
        plane2.setId(plane1.getId());
        assertThat(plane1).isEqualTo(plane2);
        plane2.setId(2L);
        assertThat(plane1).isNotEqualTo(plane2);
        plane1.setId(null);
        assertThat(plane1).isNotEqualTo(plane2);
    }
}
