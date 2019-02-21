package com.isa.planetickets.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A FlightStop.
 */
@Entity
@Table(name = "flight_stop")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FlightStop implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "stop_number")
    private Integer stopNumber;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Airport airport;

    @ManyToOne
    @JsonIgnoreProperties("flightStops")
    private Flight flight;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getStopNumber() {
        return stopNumber;
    }

    public FlightStop stopNumber(Integer stopNumber) {
        this.stopNumber = stopNumber;
        return this;
    }

    public void setStopNumber(Integer stopNumber) {
        this.stopNumber = stopNumber;
    }

    public Airport getAirport() {
        return airport;
    }

    public FlightStop airport(Airport airport) {
        this.airport = airport;
        return this;
    }

    public void setAirport(Airport airport) {
        this.airport = airport;
    }

    public Flight getFlight() {
        return flight;
    }

    public FlightStop flight(Flight flight) {
        this.flight = flight;
        return this;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
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
        FlightStop flightStop = (FlightStop) o;
        if (flightStop.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), flightStop.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FlightStop{" +
            "id=" + getId() +
            ", stopNumber=" + getStopNumber() +
            "}";
    }
}
