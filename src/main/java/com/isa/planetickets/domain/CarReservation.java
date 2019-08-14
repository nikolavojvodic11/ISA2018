package com.isa.planetickets.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A CarReservation.
 */
@Entity
@Table(name = "car_reservation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CarReservation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_from")
    private Instant dateFrom;

    @Column(name = "date_to")
    private Instant dateTo;

    @Column(name = "price")
    private Double price;

    @Column(name = "discount")
    private Integer discount;

    @Column(name = "hotel_rating")
    private Integer hotelRating;

    @Column(name = "room_rating")
    private Integer roomRating;

    @Column(name = "deleted")
    private Boolean deleted;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Car car;

    @ManyToOne
    @JsonIgnoreProperties("carReservations")
    private Reservation carReservation;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateFrom() {
        return dateFrom;
    }

    public CarReservation dateFrom(Instant dateFrom) {
        this.dateFrom = dateFrom;
        return this;
    }

    public void setDateFrom(Instant dateFrom) {
        this.dateFrom = dateFrom;
    }

    public Instant getDateTo() {
        return dateTo;
    }

    public CarReservation dateTo(Instant dateTo) {
        this.dateTo = dateTo;
        return this;
    }

    public void setDateTo(Instant dateTo) {
        this.dateTo = dateTo;
    }

    public Double getPrice() {
        return price;
    }

    public CarReservation price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getDiscount() {
        return discount;
    }

    public CarReservation discount(Integer discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public Integer getHotelRating() {
        return hotelRating;
    }

    public CarReservation hotelRating(Integer hotelRating) {
        this.hotelRating = hotelRating;
        return this;
    }

    public void setHotelRating(Integer hotelRating) {
        this.hotelRating = hotelRating;
    }

    public Integer getRoomRating() {
        return roomRating;
    }

    public CarReservation roomRating(Integer roomRating) {
        this.roomRating = roomRating;
        return this;
    }

    public void setRoomRating(Integer roomRating) {
        this.roomRating = roomRating;
    }

    public Boolean isDeleted() {
        return deleted;
    }

    public CarReservation deleted(Boolean deleted) {
        this.deleted = deleted;
        return this;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public Car getCar() {
        return car;
    }

    public CarReservation car(Car car) {
        this.car = car;
        return this;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public Reservation getCarReservation() {
        return carReservation;
    }

    public CarReservation carReservation(Reservation reservation) {
        this.carReservation = reservation;
        return this;
    }

    public void setCarReservation(Reservation reservation) {
        this.carReservation = reservation;
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
        CarReservation carReservation = (CarReservation) o;
        if (carReservation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), carReservation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CarReservation{" +
            "id=" + getId() +
            ", dateFrom='" + getDateFrom() + "'" +
            ", dateTo='" + getDateTo() + "'" +
            ", price=" + getPrice() +
            ", discount=" + getDiscount() +
            ", hotelRating=" + getHotelRating() +
            ", roomRating=" + getRoomRating() +
            ", deleted='" + isDeleted() + "'" +
            "}";
    }
}
