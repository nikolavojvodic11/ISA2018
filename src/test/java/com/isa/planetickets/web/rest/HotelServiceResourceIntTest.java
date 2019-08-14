package com.isa.planetickets.web.rest;

import com.isa.planetickets.PlaneTicketsApp;

import com.isa.planetickets.domain.HotelService;
import com.isa.planetickets.repository.HotelServiceRepository;
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
 * Test class for the HotelServiceResource REST controller.
 *
 * @see HotelServiceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PlaneTicketsApp.class)
public class HotelServiceResourceIntTest {

    private static final String DEFAULT_SERVICE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SERVICE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SERVICE_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_SERVICE_DESCRIPTION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_DELETED = false;
    private static final Boolean UPDATED_DELETED = true;

    @Autowired
    private HotelServiceRepository hotelServiceRepository;

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

    private MockMvc restHotelServiceMockMvc;

    private HotelService hotelService;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HotelServiceResource hotelServiceResource = new HotelServiceResource(hotelServiceRepository);
        this.restHotelServiceMockMvc = MockMvcBuilders.standaloneSetup(hotelServiceResource)
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
    public static HotelService createEntity(EntityManager em) {
        HotelService hotelService = new HotelService()
            .serviceName(DEFAULT_SERVICE_NAME)
            .serviceDescription(DEFAULT_SERVICE_DESCRIPTION)
            .deleted(DEFAULT_DELETED);
        return hotelService;
    }

    @Before
    public void initTest() {
        hotelService = createEntity(em);
    }

    @Test
    @Transactional
    public void createHotelService() throws Exception {
        int databaseSizeBeforeCreate = hotelServiceRepository.findAll().size();

        // Create the HotelService
        restHotelServiceMockMvc.perform(post("/api/hotel-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hotelService)))
            .andExpect(status().isCreated());

        // Validate the HotelService in the database
        List<HotelService> hotelServiceList = hotelServiceRepository.findAll();
        assertThat(hotelServiceList).hasSize(databaseSizeBeforeCreate + 1);
        HotelService testHotelService = hotelServiceList.get(hotelServiceList.size() - 1);
        assertThat(testHotelService.getServiceName()).isEqualTo(DEFAULT_SERVICE_NAME);
        assertThat(testHotelService.getServiceDescription()).isEqualTo(DEFAULT_SERVICE_DESCRIPTION);
        assertThat(testHotelService.isDeleted()).isEqualTo(DEFAULT_DELETED);
    }

    @Test
    @Transactional
    public void createHotelServiceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = hotelServiceRepository.findAll().size();

        // Create the HotelService with an existing ID
        hotelService.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHotelServiceMockMvc.perform(post("/api/hotel-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hotelService)))
            .andExpect(status().isBadRequest());

        // Validate the HotelService in the database
        List<HotelService> hotelServiceList = hotelServiceRepository.findAll();
        assertThat(hotelServiceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllHotelServices() throws Exception {
        // Initialize the database
        hotelServiceRepository.saveAndFlush(hotelService);

        // Get all the hotelServiceList
        restHotelServiceMockMvc.perform(get("/api/hotel-services?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(hotelService.getId().intValue())))
            .andExpect(jsonPath("$.[*].serviceName").value(hasItem(DEFAULT_SERVICE_NAME.toString())))
            .andExpect(jsonPath("$.[*].serviceDescription").value(hasItem(DEFAULT_SERVICE_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].deleted").value(hasItem(DEFAULT_DELETED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getHotelService() throws Exception {
        // Initialize the database
        hotelServiceRepository.saveAndFlush(hotelService);

        // Get the hotelService
        restHotelServiceMockMvc.perform(get("/api/hotel-services/{id}", hotelService.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(hotelService.getId().intValue()))
            .andExpect(jsonPath("$.serviceName").value(DEFAULT_SERVICE_NAME.toString()))
            .andExpect(jsonPath("$.serviceDescription").value(DEFAULT_SERVICE_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.deleted").value(DEFAULT_DELETED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingHotelService() throws Exception {
        // Get the hotelService
        restHotelServiceMockMvc.perform(get("/api/hotel-services/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHotelService() throws Exception {
        // Initialize the database
        hotelServiceRepository.saveAndFlush(hotelService);

        int databaseSizeBeforeUpdate = hotelServiceRepository.findAll().size();

        // Update the hotelService
        HotelService updatedHotelService = hotelServiceRepository.findById(hotelService.getId()).get();
        // Disconnect from session so that the updates on updatedHotelService are not directly saved in db
        em.detach(updatedHotelService);
        updatedHotelService
            .serviceName(UPDATED_SERVICE_NAME)
            .serviceDescription(UPDATED_SERVICE_DESCRIPTION)
            .deleted(UPDATED_DELETED);

        restHotelServiceMockMvc.perform(put("/api/hotel-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHotelService)))
            .andExpect(status().isOk());

        // Validate the HotelService in the database
        List<HotelService> hotelServiceList = hotelServiceRepository.findAll();
        assertThat(hotelServiceList).hasSize(databaseSizeBeforeUpdate);
        HotelService testHotelService = hotelServiceList.get(hotelServiceList.size() - 1);
        assertThat(testHotelService.getServiceName()).isEqualTo(UPDATED_SERVICE_NAME);
        assertThat(testHotelService.getServiceDescription()).isEqualTo(UPDATED_SERVICE_DESCRIPTION);
        assertThat(testHotelService.isDeleted()).isEqualTo(UPDATED_DELETED);
    }

    @Test
    @Transactional
    public void updateNonExistingHotelService() throws Exception {
        int databaseSizeBeforeUpdate = hotelServiceRepository.findAll().size();

        // Create the HotelService

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHotelServiceMockMvc.perform(put("/api/hotel-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hotelService)))
            .andExpect(status().isBadRequest());

        // Validate the HotelService in the database
        List<HotelService> hotelServiceList = hotelServiceRepository.findAll();
        assertThat(hotelServiceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHotelService() throws Exception {
        // Initialize the database
        hotelServiceRepository.saveAndFlush(hotelService);

        int databaseSizeBeforeDelete = hotelServiceRepository.findAll().size();

        // Get the hotelService
        restHotelServiceMockMvc.perform(delete("/api/hotel-services/{id}", hotelService.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<HotelService> hotelServiceList = hotelServiceRepository.findAll();
        assertThat(hotelServiceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HotelService.class);
        HotelService hotelService1 = new HotelService();
        hotelService1.setId(1L);
        HotelService hotelService2 = new HotelService();
        hotelService2.setId(hotelService1.getId());
        assertThat(hotelService1).isEqualTo(hotelService2);
        hotelService2.setId(2L);
        assertThat(hotelService1).isNotEqualTo(hotelService2);
        hotelService1.setId(null);
        assertThat(hotelService1).isNotEqualTo(hotelService2);
    }
}
