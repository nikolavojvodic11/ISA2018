package com.isa.planetickets.web.rest;

import com.isa.planetickets.PlaneTicketsApp;

import com.isa.planetickets.domain.IsaUser;
import com.isa.planetickets.repository.IsaUserRepository;
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
 * Test class for the IsaUserResource REST controller.
 *
 * @see IsaUserResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PlaneTicketsApp.class)
public class IsaUserResourceIntTest {

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_FIRST_LOGIN = false;
    private static final Boolean UPDATED_FIRST_LOGIN = true;

    private static final Integer DEFAULT_POINTS_USED = 1;
    private static final Integer UPDATED_POINTS_USED = 2;

    private static final Boolean DEFAULT_PASSWORD_CHANGED = false;
    private static final Boolean UPDATED_PASSWORD_CHANGED = true;

    private static final Boolean DEFAULT_DELETED = false;
    private static final Boolean UPDATED_DELETED = true;

    @Autowired
    private IsaUserRepository isaUserRepository;

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

    private MockMvc restIsaUserMockMvc;

    private IsaUser isaUser;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IsaUserResource isaUserResource = new IsaUserResource(isaUserRepository);
        this.restIsaUserMockMvc = MockMvcBuilders.standaloneSetup(isaUserResource)
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
    public static IsaUser createEntity(EntityManager em) {
        IsaUser isaUser = new IsaUser()
            .phone(DEFAULT_PHONE)
            .firstLogin(DEFAULT_FIRST_LOGIN)
            .pointsUsed(DEFAULT_POINTS_USED)
            .passwordChanged(DEFAULT_PASSWORD_CHANGED)
            .deleted(DEFAULT_DELETED);
        return isaUser;
    }

    @Before
    public void initTest() {
        isaUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createIsaUser() throws Exception {
        int databaseSizeBeforeCreate = isaUserRepository.findAll().size();

        // Create the IsaUser
        restIsaUserMockMvc.perform(post("/api/isa-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(isaUser)))
            .andExpect(status().isCreated());

        // Validate the IsaUser in the database
        List<IsaUser> isaUserList = isaUserRepository.findAll();
        assertThat(isaUserList).hasSize(databaseSizeBeforeCreate + 1);
        IsaUser testIsaUser = isaUserList.get(isaUserList.size() - 1);
        assertThat(testIsaUser.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testIsaUser.isFirstLogin()).isEqualTo(DEFAULT_FIRST_LOGIN);
        assertThat(testIsaUser.getPointsUsed()).isEqualTo(DEFAULT_POINTS_USED);
        assertThat(testIsaUser.isPasswordChanged()).isEqualTo(DEFAULT_PASSWORD_CHANGED);
        assertThat(testIsaUser.isDeleted()).isEqualTo(DEFAULT_DELETED);
    }

    @Test
    @Transactional
    public void createIsaUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = isaUserRepository.findAll().size();

        // Create the IsaUser with an existing ID
        isaUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIsaUserMockMvc.perform(post("/api/isa-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(isaUser)))
            .andExpect(status().isBadRequest());

        // Validate the IsaUser in the database
        List<IsaUser> isaUserList = isaUserRepository.findAll();
        assertThat(isaUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllIsaUsers() throws Exception {
        // Initialize the database
        isaUserRepository.saveAndFlush(isaUser);

        // Get all the isaUserList
        restIsaUserMockMvc.perform(get("/api/isa-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(isaUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())))
            .andExpect(jsonPath("$.[*].firstLogin").value(hasItem(DEFAULT_FIRST_LOGIN.booleanValue())))
            .andExpect(jsonPath("$.[*].pointsUsed").value(hasItem(DEFAULT_POINTS_USED)))
            .andExpect(jsonPath("$.[*].passwordChanged").value(hasItem(DEFAULT_PASSWORD_CHANGED.booleanValue())))
            .andExpect(jsonPath("$.[*].deleted").value(hasItem(DEFAULT_DELETED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getIsaUser() throws Exception {
        // Initialize the database
        isaUserRepository.saveAndFlush(isaUser);

        // Get the isaUser
        restIsaUserMockMvc.perform(get("/api/isa-users/{id}", isaUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(isaUser.getId().intValue()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE.toString()))
            .andExpect(jsonPath("$.firstLogin").value(DEFAULT_FIRST_LOGIN.booleanValue()))
            .andExpect(jsonPath("$.pointsUsed").value(DEFAULT_POINTS_USED))
            .andExpect(jsonPath("$.passwordChanged").value(DEFAULT_PASSWORD_CHANGED.booleanValue()))
            .andExpect(jsonPath("$.deleted").value(DEFAULT_DELETED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingIsaUser() throws Exception {
        // Get the isaUser
        restIsaUserMockMvc.perform(get("/api/isa-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIsaUser() throws Exception {
        // Initialize the database
        isaUserRepository.saveAndFlush(isaUser);

        int databaseSizeBeforeUpdate = isaUserRepository.findAll().size();

        // Update the isaUser
        IsaUser updatedIsaUser = isaUserRepository.findById(isaUser.getId()).get();
        // Disconnect from session so that the updates on updatedIsaUser are not directly saved in db
        em.detach(updatedIsaUser);
        updatedIsaUser
            .phone(UPDATED_PHONE)
            .firstLogin(UPDATED_FIRST_LOGIN)
            .pointsUsed(UPDATED_POINTS_USED)
            .passwordChanged(UPDATED_PASSWORD_CHANGED)
            .deleted(UPDATED_DELETED);

        restIsaUserMockMvc.perform(put("/api/isa-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIsaUser)))
            .andExpect(status().isOk());

        // Validate the IsaUser in the database
        List<IsaUser> isaUserList = isaUserRepository.findAll();
        assertThat(isaUserList).hasSize(databaseSizeBeforeUpdate);
        IsaUser testIsaUser = isaUserList.get(isaUserList.size() - 1);
        assertThat(testIsaUser.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testIsaUser.isFirstLogin()).isEqualTo(UPDATED_FIRST_LOGIN);
        assertThat(testIsaUser.getPointsUsed()).isEqualTo(UPDATED_POINTS_USED);
        assertThat(testIsaUser.isPasswordChanged()).isEqualTo(UPDATED_PASSWORD_CHANGED);
        assertThat(testIsaUser.isDeleted()).isEqualTo(UPDATED_DELETED);
    }

    @Test
    @Transactional
    public void updateNonExistingIsaUser() throws Exception {
        int databaseSizeBeforeUpdate = isaUserRepository.findAll().size();

        // Create the IsaUser

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIsaUserMockMvc.perform(put("/api/isa-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(isaUser)))
            .andExpect(status().isBadRequest());

        // Validate the IsaUser in the database
        List<IsaUser> isaUserList = isaUserRepository.findAll();
        assertThat(isaUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteIsaUser() throws Exception {
        // Initialize the database
        isaUserRepository.saveAndFlush(isaUser);

        int databaseSizeBeforeDelete = isaUserRepository.findAll().size();

        // Get the isaUser
        restIsaUserMockMvc.perform(delete("/api/isa-users/{id}", isaUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<IsaUser> isaUserList = isaUserRepository.findAll();
        assertThat(isaUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IsaUser.class);
        IsaUser isaUser1 = new IsaUser();
        isaUser1.setId(1L);
        IsaUser isaUser2 = new IsaUser();
        isaUser2.setId(isaUser1.getId());
        assertThat(isaUser1).isEqualTo(isaUser2);
        isaUser2.setId(2L);
        assertThat(isaUser1).isNotEqualTo(isaUser2);
        isaUser1.setId(null);
        assertThat(isaUser1).isNotEqualTo(isaUser2);
    }
}
