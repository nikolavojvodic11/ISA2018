package com.isa.planetickets.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Flight.
 */
@Entity
@Table(name = "flight")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Flight implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "departure_time")
    private ZonedDateTime departureTime;

    @Column(name = "arrival_time")
    private ZonedDateTime arrivalTime;

    @Column(name = "flight_duration")
    private Integer flightDuration;

    @Column(name = "flight_distance")
    private Integer flightDistance;

    @Column(name = "stops_count")
    private Integer stopsCount;

    @Column(name = "price")
    private Double price;

    @OneToMany(mappedBy = "flight")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<FlightStop> flightStops = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("")
    private Airport departureAirport;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Airport arrivalAirport;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Plane plane;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Company company;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDepartureTime() {
        return departureTime;
    }

    public Flight departureTime(ZonedDateTime departureTime) {
        this.departureTime = departureTime;
        return this;
    }

    public void setDepartureTime(ZonedDateTime departureTime) {
        this.departureTime = departureTime;
    }

    public ZonedDateTime getArrivalTime() {
        return arrivalTime;
    }

    public Flight arrivalTime(ZonedDateTime arrivalTime) {
        this.arrivalTime = arrivalTime;
        return this;
    }

    public void setArrivalTime(ZonedDateTime arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public Integer getFlightDuration() {
        return flightDuration;
    }

    public Flight flightDuration(Integer flightDuration) {
        this.flightDuration = flightDuration;
        return this;
    }

    public void setFlightDuration(Integer flightDuration) {
        this.flightDuration = flightDuration;
    }

    public Integer getFlightDistance() {
        return flightDistance;
    }

    public Flight flightDistance(Integer flightDistance) {
        this.flightDistance = flightDistance;
        return this;
    }

    public void setFlightDistance(Integer flightDistance) {
        this.flightDistance = flightDistance;
    }

    public Integer getStopsCount() {
        return stopsCount;
    }

    public Flight stopsCount(Integer stopsCount) {
        this.stopsCount = stopsCount;
        return this;
    }

    public void setStopsCount(Integer stopsCount) {
        this.stopsCount = stopsCount;
    }

    public Double getPrice() {
        return price;
    }

    public Flight price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Set<FlightStop> getFlightStops() {
        return flightStops;
    }

    public Flight flightStops(Set<FlightStop> flightStops) {
        this.flightStops = flightStops;
        return this;
    }

    public Flight addFlightStop(FlightStop flightStop) {
        this.flightStops.add(flightStop);
        flightStop.setFlight(this);
        return this;
    }

    public Flight removeFlightStop(FlightStop flightStop) {
        this.flightStops.remove(flightStop);
        flightStop.setFlight(null);
        return this;
    }

    public void setFlightStops(Set<FlightStop> flightStops) {
        this.flightStops = flightStops;
    }

    public Airport getDepartureAirport() {
        return departureAirport;
    }

    public Flight departureAirport(Airport airport) {
        this.departureAirport = airport;
        return this;
    }

    public void setDepartureAirport(Airport airport) {
        this.departureAirport = airport;
    }

    public Airport getArrivalAirport() {
        return arrivalAirport;
    }

    public Flight arrivalAirport(Airport airport) {
        this.arrivalAirport = airport;
        return this;
    }

    public void setArrivalAirport(Airport airport) {
        this.arrivalAirport = airport;
    }

    public Plane getPlane() {
        return plane;
    }

    public Flight plane(Plane plane) {
        this.plane = plane;
        return this;
    }

    public void setPlane(Plane plane) {
        this.plane = plane;
    }

    public Company getCompany() {
        return company;
    }

    public Flight company(Company company) {
        this.company = company;
        return this;
    }

    public void setCompany(Company company) {
        this.company = company;
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
        Flight flight = (Flight) o;
        if (flight.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), flight.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Flight{" +
            "id=" + getId() +
            ", departureTime='" + getDepartureTime() + "'" +
            ", arrivalTime='" + getArrivalTime() + "'" +
            ", flightDuration=" + getFlightDuration() +
            ", flightDistance=" + getFlightDistance() +
            ", stopsCount=" + getStopsCount() +
            ", price=" + getPrice() +
            "}";
    }
}
