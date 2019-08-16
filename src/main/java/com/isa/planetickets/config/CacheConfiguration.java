package com.isa.planetickets.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.isa.planetickets.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.isa.planetickets.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.IsaUser.class.getName(), jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.IsaUser.class.getName() + ".reservations", jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.City.class.getName(), jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.City.class.getName() + ".airports", jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.Company.class.getName(), jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.Company.class.getName() + ".companyLocations", jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.Company.class.getName() + ".planes", jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.Company.class.getName() + ".images", jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.CompanyLocation.class.getName(), jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.CompanyLocation.class.getName() + ".cars", jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.CompanyLocation.class.getName() + ".hotels", jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.Airport.class.getName(), jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.Flight.class.getName(), jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.Flight.class.getName() + ".flightStops", jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.Plane.class.getName(), jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.Plane.class.getName() + ".seats", jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.Seat.class.getName(), jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.Car.class.getName(), jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.Car.class.getName() + ".images", jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.Hotel.class.getName(), jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.Hotel.class.getName() + ".rooms", jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.Hotel.class.getName() + ".images", jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.Hotel.class.getName() + ".availableHotelServices", jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.Room.class.getName(), jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.Room.class.getName() + ".roomPricelists", jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.Room.class.getName() + ".images", jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.RoomPricelist.class.getName(), jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.Reservation.class.getName(), jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.Reservation.class.getName() + ".hotelServiceReservations", jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.Reservation.class.getName() + ".hotelRoomReservations", jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.Reservation.class.getName() + ".flightSeatReservations", jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.Reservation.class.getName() + ".carReservations", jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.FriendRequest.class.getName(), jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.Image.class.getName(), jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.HotelService.class.getName(), jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.AvailableHotelService.class.getName(), jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.HotelServiceReservation.class.getName(), jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.HotelRoomReservation.class.getName(), jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.FlightSeatReservation.class.getName(), jcacheConfiguration);
            cm.createCache(com.isa.planetickets.domain.CarReservation.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
