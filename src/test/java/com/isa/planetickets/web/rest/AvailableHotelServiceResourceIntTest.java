package com.isa.planetickets.web.rest;

import com.isa.planetickets.PlaneTicketsApp;

import com.isa.planetickets.domain.AvailableHotelService;
import com.isa.planetickets.repository.AvailableHotelServiceRepository;
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
 * Test class for the AvailableHotelServiceResource REST controller.
 *
 * @see AvailableHotelServiceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PlaneTicketsApp.class)
public class AvailableHotelServiceResourceIntTest {

    private static final Double DEFAULT_PRICE = 1D;
    private static final Double UPDATED_PRICE = 2D;

    private static final Integer DEFAULT_DISCOUNT = 1;
    private static final Integer UPDATED_DISCOUNT = 2;

    private static final Boolean DEFAULT_DELETED = false;
    private static final Boolean UPDATED_DELETED = true;

    @Autowired
    private AvailableHotelServiceRepository availableHotelServiceRepository;

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

    private MockMvc restAvailableHotelServiceMockMvc;

    private AvailableHotelService availableHotelService;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AvailableHotelServiceResource availableHotelServiceResource = new AvailableHotelServiceResource(availableHotelServiceRepository);
        this.restAvailableHotelServiceMockMvc = MockMvcBuilders.standaloneSetup(availableHotelServiceResource)
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
    public static AvailableHotelService createEntity(EntityManager em) {
        AvailableHotelService availableHotelService = new AvailableHotelService()
            .price(DEFAULT_PRICE)
            .discount(DEFAULT_DISCOUNT)
            .deleted(DEFAULT_DELETED);
        return availableHotelService;
    }

    @Before
    public void initTest() {
        availableHotelService = createEntity(em);
    }

    @Test
    @Transactional
    public void createAvailableHotelService() throws Exception {
        int databaseSizeBeforeCreate = availableHotelServiceRepository.findAll().size();

        // Create the AvailableHotelService
        restAvailableHotelServiceMockMvc.perform(post("/api/available-hotel-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(availableHotelService)))
            .andExpect(status().isCreated());

        // Validate the AvailableHotelService in the database
        List<AvailableHotelService> availableHotelServiceList = availableHotelServiceRepository.findAll();
        assertThat(availableHotelServiceList).hasSize(databaseSizeBeforeCreate + 1);
        AvailableHotelService testAvailableHotelService = availableHotelServiceList.get(availableHotelServiceList.size() - 1);
        assertThat(testAvailableHotelService.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testAvailableHotelService.getDiscount()).isEqualTo(DEFAULT_DISCOUNT);
        assertThat(testAvailableHotelService.isDeleted()).isEqualTo(DEFAULT_DELETED);
    }

    @Test
    @Transactional
    public void createAvailableHotelServiceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = availableHotelServiceRepository.findAll().size();

        // Create the AvailableHotelService with an existing ID
        availableHotelService.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAvailableHotelServiceMockMvc.perform(post("/api/available-hotel-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(availableHotelService)))
            .andExpect(status().isBadRequest());

        // Validate the AvailableHotelService in the database
        List<AvailableHotelService> availableHotelServiceList = availableHotelServiceRepository.findAll();
        assertThat(availableHotelServiceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAvailableHotelServices() throws Exception {
        // Initialize the database
        availableHotelServiceRepository.saveAndFlush(availableHotelService);

        // Get all the availableHotelServiceList
        restAvailableHotelServiceMockMvc.perform(get("/api/available-hotel-services?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(availableHotelService.getId().intValue())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].discount").value(hasItem(DEFAULT_DISCOUNT)))
            .andExpect(jsonPath("$.[*].deleted").value(hasItem(DEFAULT_DELETED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getAvailableHotelService() throws Exception {
        // Initialize the database
        availableHotelServiceRepository.saveAndFlush(availableHotelService);

        // Get the availableHotelService
        restAvailableHotelServiceMockMvc.perform(get("/api/available-hotel-services/{id}", availableHotelService.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(availableHotelService.getId().intValue()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.discount").value(DEFAULT_DISCOUNT))
            .andExpect(jsonPath("$.deleted").value(DEFAULT_DELETED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAvailableHotelService() throws Exception {
        // Get the availableHotelService
        restAvailableHotelServiceMockMvc.perform(get("/api/available-hotel-services/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAvailableHotelService() throws Exception {
        // Initialize the database
        availableHotelServiceRepository.saveAndFlush(availableHotelService);

        int databaseSizeBeforeUpdate = availableHotelServiceRepository.findAll().size();

        // Update the availableHotelService
        AvailableHotelService updatedAvailableHotelService = availableHotelServiceRepository.findById(availableHotelService.getId()).get();
        // Disconnect from session so that the updates on updatedAvailableHotelService are not directly saved in db
        em.detach(updatedAvailableHotelService);
        updatedAvailableHotelService
            .price(UPDATED_PRICE)
            .discount(UPDATED_DISCOUNT)
            .deleted(UPDATED_DELETED);

        restAvailableHotelServiceMockMvc.perform(put("/api/available-hotel-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAvailableHotelService)))
            .andExpect(status().isOk());

        // Validate the AvailableHotelService in the database
        List<AvailableHotelService> availableHotelServiceList = availableHotelServiceRepository.findAll();
        assertThat(availableHotelServiceList).hasSize(databaseSizeBeforeUpdate);
        AvailableHotelService testAvailableHotelService = availableHotelServiceList.get(availableHotelServiceList.size() - 1);
        assertThat(testAvailableHotelService.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testAvailableHotelService.getDiscount()).isEqualTo(UPDATED_DISCOUNT);
        assertThat(testAvailableHotelService.isDeleted()).isEqualTo(UPDATED_DELETED);
    }

    @Test
    @Transactional
    public void updateNonExistingAvailableHotelService() throws Exception {
        int databaseSizeBeforeUpdate = availableHotelServiceRepository.findAll().size();

        // Create the AvailableHotelService

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAvailableHotelServiceMockMvc.perform(put("/api/available-hotel-services")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(availableHotelService)))
            .andExpect(status().isBadRequest());

        // Validate the AvailableHotelService in the database
        List<AvailableHotelService> availableHotelServiceList = availableHotelServiceRepository.findAll();
        assertThat(availableHotelServiceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAvailableHotelService() throws Exception {
        // Initialize the database
        availableHotelServiceRepository.saveAndFlush(availableHotelService);

        int databaseSizeBeforeDelete = availableHotelServiceRepository.findAll().size();

        // Get the availableHotelService
        restAvailableHotelServiceMockMvc.perform(delete("/api/available-hotel-services/{id}", availableHotelService.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AvailableHotelService> availableHotelServiceList = availableHotelServiceRepository.findAll();
        assertThat(availableHotelServiceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AvailableHotelService.class);
        AvailableHotelService availableHotelService1 = new AvailableHotelService();
        availableHotelService1.setId(1L);
        AvailableHotelService availableHotelService2 = new AvailableHotelService();
        availableHotelService2.setId(availableHotelService1.getId());
        assertThat(availableHotelService1).isEqualTo(availableHotelService2);
        availableHotelService2.setId(2L);
        assertThat(availableHotelService1).isNotEqualTo(availableHotelService2);
        availableHotelService1.setId(null);
        assertThat(availableHotelService1).isNotEqualTo(availableHotelService2);
    }
}
