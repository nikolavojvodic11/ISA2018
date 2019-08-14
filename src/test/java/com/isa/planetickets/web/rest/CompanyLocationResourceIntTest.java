package com.isa.planetickets.web.rest;

import com.isa.planetickets.PlaneTicketsApp;

import com.isa.planetickets.domain.CompanyLocation;
import com.isa.planetickets.repository.CompanyLocationRepository;
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
 * Test class for the CompanyLocationResource REST controller.
 *
 * @see CompanyLocationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PlaneTicketsApp.class)
public class CompanyLocationResourceIntTest {

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final Double DEFAULT_LAT = 1D;
    private static final Double UPDATED_LAT = 2D;

    private static final Double DEFAULT_LNG = 1D;
    private static final Double UPDATED_LNG = 2D;

    private static final Boolean DEFAULT_DELETED = false;
    private static final Boolean UPDATED_DELETED = true;

    @Autowired
    private CompanyLocationRepository companyLocationRepository;

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

    private MockMvc restCompanyLocationMockMvc;

    private CompanyLocation companyLocation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CompanyLocationResource companyLocationResource = new CompanyLocationResource(companyLocationRepository);
        this.restCompanyLocationMockMvc = MockMvcBuilders.standaloneSetup(companyLocationResource)
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
    public static CompanyLocation createEntity(EntityManager em) {
        CompanyLocation companyLocation = new CompanyLocation()
            .address(DEFAULT_ADDRESS)
            .phone(DEFAULT_PHONE)
            .email(DEFAULT_EMAIL)
            .lat(DEFAULT_LAT)
            .lng(DEFAULT_LNG)
            .deleted(DEFAULT_DELETED);
        return companyLocation;
    }

    @Before
    public void initTest() {
        companyLocation = createEntity(em);
    }

    @Test
    @Transactional
    public void createCompanyLocation() throws Exception {
        int databaseSizeBeforeCreate = companyLocationRepository.findAll().size();

        // Create the CompanyLocation
        restCompanyLocationMockMvc.perform(post("/api/company-locations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companyLocation)))
            .andExpect(status().isCreated());

        // Validate the CompanyLocation in the database
        List<CompanyLocation> companyLocationList = companyLocationRepository.findAll();
        assertThat(companyLocationList).hasSize(databaseSizeBeforeCreate + 1);
        CompanyLocation testCompanyLocation = companyLocationList.get(companyLocationList.size() - 1);
        assertThat(testCompanyLocation.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testCompanyLocation.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testCompanyLocation.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testCompanyLocation.getLat()).isEqualTo(DEFAULT_LAT);
        assertThat(testCompanyLocation.getLng()).isEqualTo(DEFAULT_LNG);
        assertThat(testCompanyLocation.isDeleted()).isEqualTo(DEFAULT_DELETED);
    }

    @Test
    @Transactional
    public void createCompanyLocationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = companyLocationRepository.findAll().size();

        // Create the CompanyLocation with an existing ID
        companyLocation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCompanyLocationMockMvc.perform(post("/api/company-locations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companyLocation)))
            .andExpect(status().isBadRequest());

        // Validate the CompanyLocation in the database
        List<CompanyLocation> companyLocationList = companyLocationRepository.findAll();
        assertThat(companyLocationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCompanyLocations() throws Exception {
        // Initialize the database
        companyLocationRepository.saveAndFlush(companyLocation);

        // Get all the companyLocationList
        restCompanyLocationMockMvc.perform(get("/api/company-locations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(companyLocation.getId().intValue())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].lat").value(hasItem(DEFAULT_LAT.doubleValue())))
            .andExpect(jsonPath("$.[*].lng").value(hasItem(DEFAULT_LNG.doubleValue())))
            .andExpect(jsonPath("$.[*].deleted").value(hasItem(DEFAULT_DELETED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getCompanyLocation() throws Exception {
        // Initialize the database
        companyLocationRepository.saveAndFlush(companyLocation);

        // Get the companyLocation
        restCompanyLocationMockMvc.perform(get("/api/company-locations/{id}", companyLocation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(companyLocation.getId().intValue()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.lat").value(DEFAULT_LAT.doubleValue()))
            .andExpect(jsonPath("$.lng").value(DEFAULT_LNG.doubleValue()))
            .andExpect(jsonPath("$.deleted").value(DEFAULT_DELETED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCompanyLocation() throws Exception {
        // Get the companyLocation
        restCompanyLocationMockMvc.perform(get("/api/company-locations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCompanyLocation() throws Exception {
        // Initialize the database
        companyLocationRepository.saveAndFlush(companyLocation);

        int databaseSizeBeforeUpdate = companyLocationRepository.findAll().size();

        // Update the companyLocation
        CompanyLocation updatedCompanyLocation = companyLocationRepository.findById(companyLocation.getId()).get();
        // Disconnect from session so that the updates on updatedCompanyLocation are not directly saved in db
        em.detach(updatedCompanyLocation);
        updatedCompanyLocation
            .address(UPDATED_ADDRESS)
            .phone(UPDATED_PHONE)
            .email(UPDATED_EMAIL)
            .lat(UPDATED_LAT)
            .lng(UPDATED_LNG)
            .deleted(UPDATED_DELETED);

        restCompanyLocationMockMvc.perform(put("/api/company-locations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCompanyLocation)))
            .andExpect(status().isOk());

        // Validate the CompanyLocation in the database
        List<CompanyLocation> companyLocationList = companyLocationRepository.findAll();
        assertThat(companyLocationList).hasSize(databaseSizeBeforeUpdate);
        CompanyLocation testCompanyLocation = companyLocationList.get(companyLocationList.size() - 1);
        assertThat(testCompanyLocation.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testCompanyLocation.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testCompanyLocation.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testCompanyLocation.getLat()).isEqualTo(UPDATED_LAT);
        assertThat(testCompanyLocation.getLng()).isEqualTo(UPDATED_LNG);
        assertThat(testCompanyLocation.isDeleted()).isEqualTo(UPDATED_DELETED);
    }

    @Test
    @Transactional
    public void updateNonExistingCompanyLocation() throws Exception {
        int databaseSizeBeforeUpdate = companyLocationRepository.findAll().size();

        // Create the CompanyLocation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCompanyLocationMockMvc.perform(put("/api/company-locations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(companyLocation)))
            .andExpect(status().isBadRequest());

        // Validate the CompanyLocation in the database
        List<CompanyLocation> companyLocationList = companyLocationRepository.findAll();
        assertThat(companyLocationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCompanyLocation() throws Exception {
        // Initialize the database
        companyLocationRepository.saveAndFlush(companyLocation);

        int databaseSizeBeforeDelete = companyLocationRepository.findAll().size();

        // Get the companyLocation
        restCompanyLocationMockMvc.perform(delete("/api/company-locations/{id}", companyLocation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CompanyLocation> companyLocationList = companyLocationRepository.findAll();
        assertThat(companyLocationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CompanyLocation.class);
        CompanyLocation companyLocation1 = new CompanyLocation();
        companyLocation1.setId(1L);
        CompanyLocation companyLocation2 = new CompanyLocation();
        companyLocation2.setId(companyLocation1.getId());
        assertThat(companyLocation1).isEqualTo(companyLocation2);
        companyLocation2.setId(2L);
        assertThat(companyLocation1).isNotEqualTo(companyLocation2);
        companyLocation1.setId(null);
        assertThat(companyLocation1).isNotEqualTo(companyLocation2);
    }
}
