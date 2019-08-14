package com.isa.planetickets.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.isa.planetickets.domain.enumeration.ReservationType;

/**
 * A Reservation.
 */
@Entity
@Table(name = "reservation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Reservation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "discount")
    private Integer discount;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private ReservationType type;

    @Column(name = "total")
    private Double total;

    @Column(name = "deleted")
    private Boolean deleted;

    @OneToMany(mappedBy = "reservation")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<HotelServiceReservation> hotelServiceReservations = new HashSet<>();
    @OneToMany(mappedBy = "reservation")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<HotelRoomReservation> hotelRoomReservations = new HashSet<>();
    @OneToMany(mappedBy = "reservation")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<FlightSeatReservation> flightSeatReservations = new HashSet<>();
    @OneToMany(mappedBy = "carReservation")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CarReservation> carReservations = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("reservations")
    private IsaUser user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDiscount() {
        return discount;
    }

    public Reservation discount(Integer discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public ReservationType getType() {
        return type;
    }

    public Reservation type(ReservationType type) {
        this.type = type;
        return this;
    }

    public void setType(ReservationType type) {
        this.type = type;
    }

    public Double getTotal() {
        return total;
    }

    public Reservation total(Double total) {
        this.total = total;
        return this;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public Boolean isDeleted() {
        return deleted;
    }

    public Reservation deleted(Boolean deleted) {
        this.deleted = deleted;
        return this;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public Set<HotelServiceReservation> getHotelServiceReservations() {
        return hotelServiceReservations;
    }

    public Reservation hotelServiceReservations(Set<HotelServiceReservation> hotelServiceReservations) {
        this.hotelServiceReservations = hotelServiceReservations;
        return this;
    }

    public Reservation addHotelServiceReservation(HotelServiceReservation hotelServiceReservation) {
        this.hotelServiceReservations.add(hotelServiceReservation);
        hotelServiceReservation.setReservation(this);
        return this;
    }

    public Reservation removeHotelServiceReservation(HotelServiceReservation hotelServiceReservation) {
        this.hotelServiceReservations.remove(hotelServiceReservation);
        hotelServiceReservation.setReservation(null);
        return this;
    }

    public void setHotelServiceReservations(Set<HotelServiceReservation> hotelServiceReservations) {
        this.hotelServiceReservations = hotelServiceReservations;
    }

    public Set<HotelRoomReservation> getHotelRoomReservations() {
        return hotelRoomReservations;
    }

    public Reservation hotelRoomReservations(Set<HotelRoomReservation> hotelRoomReservations) {
        this.hotelRoomReservations = hotelRoomReservations;
        return this;
    }

    public Reservation addHotelRoomReservation(HotelRoomReservation hotelRoomReservation) {
        this.hotelRoomReservations.add(hotelRoomReservation);
        hotelRoomReservation.setReservation(this);
        return this;
    }

    public Reservation removeHotelRoomReservation(HotelRoomReservation hotelRoomReservation) {
        this.hotelRoomReservations.remove(hotelRoomReservation);
        hotelRoomReservation.setReservation(null);
        return this;
    }

    public void setHotelRoomReservations(Set<HotelRoomReservation> hotelRoomReservations) {
        this.hotelRoomReservations = hotelRoomReservations;
    }

    public Set<FlightSeatReservation> getFlightSeatReservations() {
        return flightSeatReservations;
    }

    public Reservation flightSeatReservations(Set<FlightSeatReservation> flightSeatReservations) {
        this.flightSeatReservations = flightSeatReservations;
        return this;
    }

    public Reservation addFlightSeatReservation(FlightSeatReservation flightSeatReservation) {
        this.flightSeatReservations.add(flightSeatReservation);
        flightSeatReservation.setReservation(this);
        return this;
    }

    public Reservation removeFlightSeatReservation(FlightSeatReservation flightSeatReservation) {
        this.flightSeatReservations.remove(flightSeatReservation);
        flightSeatReservation.setReservation(null);
        return this;
    }

    public void setFlightSeatReservations(Set<FlightSeatReservation> flightSeatReservations) {
        this.flightSeatReservations = flightSeatReservations;
    }

    public Set<CarReservation> getCarReservations() {
        return carReservations;
    }

    public Reservation carReservations(Set<CarReservation> carReservations) {
        this.carReservations = carReservations;
        return this;
    }

    public Reservation addCarReservation(CarReservation carReservation) {
        this.carReservations.add(carReservation);
        carReservation.setCarReservation(this);
        return this;
    }

    public Reservation removeCarReservation(CarReservation carReservation) {
        this.carReservations.remove(carReservation);
        carReservation.setCarReservation(null);
        return this;
    }

    public void setCarReservations(Set<CarReservation> carReservations) {
        this.carReservations = carReservations;
    }

    public IsaUser getUser() {
        return user;
    }

    public Reservation user(IsaUser isaUser) {
        this.user = isaUser;
        return this;
    }

    public void setUser(IsaUser isaUser) {
        this.user = isaUser;
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
        Reservation reservation = (Reservation) o;
        if (reservation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reservation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Reservation{" +
            "id=" + getId() +
            ", discount=" + getDiscount() +
            ", type='" + getType() + "'" +
            ", total=" + getTotal() +
            ", deleted='" + isDeleted() + "'" +
            "}";
    }
}
