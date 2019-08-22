package com.isa.planetickets.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
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
    private Instant departureTime;

    @Column(name = "arrival_time")
    private Instant arrivalTime;

    @Column(name = "flight_duration")
    private Integer flightDuration;

    @Column(name = "flight_distance")
    private Integer flightDistance;

    @Column(name = "price")
    private Double price;

    @Column(name = "business_price")
    private Double businessPrice;

    @Column(name = "free_bags")
    private Integer freeBags;

    @Column(name = "free_carry_on_bags")
    private Integer freeCarryOnBags;

    @Column(name = "price_per_additional_bag")
    private Double pricePerAdditionalBag;

    @Column(name = "max_bags_allowed")
    private Integer maxBagsAllowed;

    @Column(name = "discount")
    private Integer discount;

    @Column(name = "code")
    private String code;

    @Column(name = "deleted")
    private Boolean deleted;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Airport departureAirport;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Airport arrivalAirport;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Plane plane;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDepartureTime() {
        return departureTime;
    }

    public Flight departureTime(Instant departureTime) {
        this.departureTime = departureTime;
        return this;
    }

    public void setDepartureTime(Instant departureTime) {
        this.departureTime = departureTime;
    }

    public Instant getArrivalTime() {
        return arrivalTime;
    }

    public Flight arrivalTime(Instant arrivalTime) {
        this.arrivalTime = arrivalTime;
        return this;
    }

    public void setArrivalTime(Instant arrivalTime) {
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

    public Double getBusinessPrice() {
        return businessPrice;
    }

    public Flight businessPrice(Double businessPrice) {
        this.businessPrice = businessPrice;
        return this;
    }

    public void setBusinessPrice(Double businessPrice) {
        this.businessPrice = businessPrice;
    }

    public Integer getFreeBags() {
        return freeBags;
    }

    public Flight freeBags(Integer freeBags) {
        this.freeBags = freeBags;
        return this;
    }

    public void setFreeBags(Integer freeBags) {
        this.freeBags = freeBags;
    }

    public Integer getFreeCarryOnBags() {
        return freeCarryOnBags;
    }

    public Flight freeCarryOnBags(Integer freeCarryOnBags) {
        this.freeCarryOnBags = freeCarryOnBags;
        return this;
    }

    public void setFreeCarryOnBags(Integer freeCarryOnBags) {
        this.freeCarryOnBags = freeCarryOnBags;
    }

    public Double getPricePerAdditionalBag() {
        return pricePerAdditionalBag;
    }

    public Flight pricePerAdditionalBag(Double pricePerAdditionalBag) {
        this.pricePerAdditionalBag = pricePerAdditionalBag;
        return this;
    }

    public void setPricePerAdditionalBag(Double pricePerAdditionalBag) {
        this.pricePerAdditionalBag = pricePerAdditionalBag;
    }

    public Integer getMaxBagsAllowed() {
        return maxBagsAllowed;
    }

    public Flight maxBagsAllowed(Integer maxBagsAllowed) {
        this.maxBagsAllowed = maxBagsAllowed;
        return this;
    }

    public void setMaxBagsAllowed(Integer maxBagsAllowed) {
        this.maxBagsAllowed = maxBagsAllowed;
    }

    public Integer getDiscount() {
        return discount;
    }

    public Flight discount(Integer discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public String getCode() {
        return code;
    }

    public Flight code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Boolean isDeleted() {
        return deleted;
    }

    public Flight deleted(Boolean deleted) {
        this.deleted = deleted;
        return this;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
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
            ", price=" + getPrice() +
            ", businessPrice=" + getBusinessPrice() +
            ", freeBags=" + getFreeBags() +
            ", freeCarryOnBags=" + getFreeCarryOnBags() +
            ", pricePerAdditionalBag=" + getPricePerAdditionalBag() +
            ", maxBagsAllowed=" + getMaxBagsAllowed() +
            ", discount=" + getDiscount() +
            ", code='" + getCode() + "'" +
            ", deleted='" + isDeleted() + "'" +
            "}";
    }
}
