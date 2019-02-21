package com.isa.planetickets.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A AvailableHotelService.
 */
@Entity
@Table(name = "available_hotel_service")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AvailableHotelService implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "price")
    private Double price;

    @Column(name = "discount")
    private Integer discount;

    @ManyToOne
    @JsonIgnoreProperties("")
    private HotelService hotelServiceReservation;

    @ManyToOne
    @JsonIgnoreProperties("availableHotelServices")
    private Hotel hotel;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getPrice() {
        return price;
    }

    public AvailableHotelService price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getDiscount() {
        return discount;
    }

    public AvailableHotelService discount(Integer discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public HotelService getHotelServiceReservation() {
        return hotelServiceReservation;
    }

    public AvailableHotelService hotelServiceReservation(HotelService hotelService) {
        this.hotelServiceReservation = hotelService;
        return this;
    }

    public void setHotelServiceReservation(HotelService hotelService) {
        this.hotelServiceReservation = hotelService;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public AvailableHotelService hotel(Hotel hotel) {
        this.hotel = hotel;
        return this;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AvailableHotelService availableHotelService = (AvailableHotelService) o;
        if (availableHotelService.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), availableHotelService.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AvailableHotelService{" +
            "id=" + getId() +
            ", price=" + getPrice() +
            ", discount=" + getDiscount() +
            "}";
    }
}
