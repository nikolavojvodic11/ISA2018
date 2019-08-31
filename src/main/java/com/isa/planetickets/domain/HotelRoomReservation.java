package com.isa.planetickets.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.isa.planetickets.domain.enumeration.ReservationStatus;

/**
 * A HotelRoomReservation.
 */
@Entity
@Table(name = "hotel_room_reservation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class HotelRoomReservation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_from")
    private Instant dateFrom;

    @Column(name = "date_to")
    private Instant dateTo;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ReservationStatus status;

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
    @JsonIgnoreProperties("room")
    private Room room;

    @ManyToOne
    @JsonIgnoreProperties("hotelRoomReservations")
    private Reservation reservation;

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

    public HotelRoomReservation dateFrom(Instant dateFrom) {
        this.dateFrom = dateFrom;
        return this;
    }

    public void setDateFrom(Instant dateFrom) {
        this.dateFrom = dateFrom;
    }

    public Instant getDateTo() {
        return dateTo;
    }

    public HotelRoomReservation dateTo(Instant dateTo) {
        this.dateTo = dateTo;
        return this;
    }

    public void setDateTo(Instant dateTo) {
        this.dateTo = dateTo;
    }

    public ReservationStatus getStatus() {
        return status;
    }

    public HotelRoomReservation status(ReservationStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(ReservationStatus status) {
        this.status = status;
    }

    public Double getPrice() {
        return price;
    }

    public HotelRoomReservation price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getDiscount() {
        return discount;
    }

    public HotelRoomReservation discount(Integer discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public Integer getHotelRating() {
        return hotelRating;
    }

    public HotelRoomReservation hotelRating(Integer hotelRating) {
        this.hotelRating = hotelRating;
        return this;
    }

    public void setHotelRating(Integer hotelRating) {
        this.hotelRating = hotelRating;
    }

    public Integer getRoomRating() {
        return roomRating;
    }

    public HotelRoomReservation roomRating(Integer roomRating) {
        this.roomRating = roomRating;
        return this;
    }

    public void setRoomRating(Integer roomRating) {
        this.roomRating = roomRating;
    }

    public Boolean isDeleted() {
        return deleted;
    }

    public HotelRoomReservation deleted(Boolean deleted) {
        this.deleted = deleted;
        return this;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public Room getRoom() {
        return room;
    }

    public HotelRoomReservation room(Room room) {
        this.room = room;
        return this;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public HotelRoomReservation reservation(Reservation reservation) {
        this.reservation = reservation;
        return this;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
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
        HotelRoomReservation hotelRoomReservation = (HotelRoomReservation) o;
        if (hotelRoomReservation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), hotelRoomReservation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HotelRoomReservation{" +
            "id=" + getId() +
            ", dateFrom='" + getDateFrom() + "'" +
            ", dateTo='" + getDateTo() + "'" +
            ", status='" + getStatus() + "'" +
            ", price=" + getPrice() +
            ", discount=" + getDiscount() +
            ", hotelRating=" + getHotelRating() +
            ", roomRating=" + getRoomRating() +
            ", deleted='" + isDeleted() + "'" +
            "}";
    }
}
