package com.isa.planetickets.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A FlightTicket.
 */
@Entity
@Table(name = "flight_ticket")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FlightTicket implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "seat_row")
    private Integer seatRow;

    @Column(name = "seat_col")
    private Integer seatCol;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Flight flight;

    @ManyToOne
    @JsonIgnoreProperties("")
    private IsaUser user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSeatRow() {
        return seatRow;
    }

    public FlightTicket seatRow(Integer seatRow) {
        this.seatRow = seatRow;
        return this;
    }

    public void setSeatRow(Integer seatRow) {
        this.seatRow = seatRow;
    }

    public Integer getSeatCol() {
        return seatCol;
    }

    public FlightTicket seatCol(Integer seatCol) {
        this.seatCol = seatCol;
        return this;
    }

    public void setSeatCol(Integer seatCol) {
        this.seatCol = seatCol;
    }

    public Flight getFlight() {
        return flight;
    }

    public FlightTicket flight(Flight flight) {
        this.flight = flight;
        return this;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public IsaUser getUser() {
        return user;
    }

    public FlightTicket user(IsaUser isaUser) {
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
        FlightTicket flightTicket = (FlightTicket) o;
        if (flightTicket.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), flightTicket.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FlightTicket{" +
            "id=" + getId() +
            ", seatRow=" + getSeatRow() +
            ", seatCol=" + getSeatCol() +
            "}";
    }
}
