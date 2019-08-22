package com.isa.planetickets.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import com.isa.planetickets.domain.enumeration.ReservationStatus;

/**
 * A FlightSeatReservation.
 */
@Entity
@Table(name = "flight_seat_reservation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FlightSeatReservation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "passport_number")
    private String passportNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ReservationStatus status;

    @Column(name = "flight_number")
    private Integer flightNumber;

    @Column(name = "seat_row")
    private Integer seatRow;

    @Column(name = "seat_col")
    private String seatCol;

    @Column(name = "business")
    private Boolean business;

    @Column(name = "price")
    private Double price;

    @Column(name = "discount")
    private Integer discount;

    @Column(name = "airline_rating")
    private Integer airlineRating;

    @Column(name = "flight_rating")
    private Integer flightRating;

    @Column(name = "points_earned")
    private Integer pointsEarned;

    @Column(name = "deleted")
    private Boolean deleted;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Flight flight;

    @ManyToOne
    @JsonIgnoreProperties("")
    private IsaUser user;

    @ManyToOne
    @JsonIgnoreProperties("flightSeatReservations")
    private Reservation reservation;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public FlightSeatReservation firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public FlightSeatReservation lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassportNumber() {
        return passportNumber;
    }

    public FlightSeatReservation passportNumber(String passportNumber) {
        this.passportNumber = passportNumber;
        return this;
    }

    public void setPassportNumber(String passportNumber) {
        this.passportNumber = passportNumber;
    }

    public ReservationStatus getStatus() {
        return status;
    }

    public FlightSeatReservation status(ReservationStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(ReservationStatus status) {
        this.status = status;
    }

    public Integer getFlightNumber() {
        return flightNumber;
    }

    public FlightSeatReservation flightNumber(Integer flightNumber) {
        this.flightNumber = flightNumber;
        return this;
    }

    public void setFlightNumber(Integer flightNumber) {
        this.flightNumber = flightNumber;
    }

    public Integer getSeatRow() {
        return seatRow;
    }

    public FlightSeatReservation seatRow(Integer seatRow) {
        this.seatRow = seatRow;
        return this;
    }

    public void setSeatRow(Integer seatRow) {
        this.seatRow = seatRow;
    }

    public String getSeatCol() {
        return seatCol;
    }

    public FlightSeatReservation seatCol(String seatCol) {
        this.seatCol = seatCol;
        return this;
    }

    public void setSeatCol(String seatCol) {
        this.seatCol = seatCol;
    }

    public Boolean isBusiness() {
        return business;
    }

    public FlightSeatReservation business(Boolean business) {
        this.business = business;
        return this;
    }

    public void setBusiness(Boolean business) {
        this.business = business;
    }

    public Double getPrice() {
        return price;
    }

    public FlightSeatReservation price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getDiscount() {
        return discount;
    }

    public FlightSeatReservation discount(Integer discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public Integer getAirlineRating() {
        return airlineRating;
    }

    public FlightSeatReservation airlineRating(Integer airlineRating) {
        this.airlineRating = airlineRating;
        return this;
    }

    public void setAirlineRating(Integer airlineRating) {
        this.airlineRating = airlineRating;
    }

    public Integer getFlightRating() {
        return flightRating;
    }

    public FlightSeatReservation flightRating(Integer flightRating) {
        this.flightRating = flightRating;
        return this;
    }

    public void setFlightRating(Integer flightRating) {
        this.flightRating = flightRating;
    }

    public Integer getPointsEarned() {
        return pointsEarned;
    }

    public FlightSeatReservation pointsEarned(Integer pointsEarned) {
        this.pointsEarned = pointsEarned;
        return this;
    }

    public void setPointsEarned(Integer pointsEarned) {
        this.pointsEarned = pointsEarned;
    }

    public Boolean isDeleted() {
        return deleted;
    }

    public FlightSeatReservation deleted(Boolean deleted) {
        this.deleted = deleted;
        return this;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public Flight getFlight() {
        return flight;
    }

    public FlightSeatReservation flight(Flight flight) {
        this.flight = flight;
        return this;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public IsaUser getUser() {
        return user;
    }

    public FlightSeatReservation user(IsaUser isaUser) {
        this.user = isaUser;
        return this;
    }

    public void setUser(IsaUser isaUser) {
        this.user = isaUser;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public FlightSeatReservation reservation(Reservation reservation) {
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
        FlightSeatReservation flightSeatReservation = (FlightSeatReservation) o;
        if (flightSeatReservation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), flightSeatReservation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FlightSeatReservation{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", passportNumber='" + getPassportNumber() + "'" +
            ", status='" + getStatus() + "'" +
            ", flightNumber=" + getFlightNumber() +
            ", seatRow=" + getSeatRow() +
            ", seatCol='" + getSeatCol() + "'" +
            ", business='" + isBusiness() + "'" +
            ", price=" + getPrice() +
            ", discount=" + getDiscount() +
            ", airlineRating=" + getAirlineRating() +
            ", flightRating=" + getFlightRating() +
            ", pointsEarned=" + getPointsEarned() +
            ", deleted='" + isDeleted() + "'" +
            "}";
    }
}
