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

/**
 * A Plane.
 */
@Entity
@Table(name = "plane")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Plane implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "manufacturer")
    private String manufacturer;

    @Column(name = "model")
    private String model;

    @Column(name = "registration")
    private String registration;

    @Column(name = "rows_count")
    private Integer rowsCount;

    @Column(name = "cols_count")
    private Integer colsCount;

    @Column(name = "deleted")
    private Boolean deleted;

    @OneToMany(mappedBy = "plane")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Seat> seats = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("planes")
    private Company company;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public Plane manufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
        return this;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getModel() {
        return model;
    }

    public Plane model(String model) {
        this.model = model;
        return this;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getRegistration() {
        return registration;
    }

    public Plane registration(String registration) {
        this.registration = registration;
        return this;
    }

    public void setRegistration(String registration) {
        this.registration = registration;
    }

    public Integer getRowsCount() {
        return rowsCount;
    }

    public Plane rowsCount(Integer rowsCount) {
        this.rowsCount = rowsCount;
        return this;
    }

    public void setRowsCount(Integer rowsCount) {
        this.rowsCount = rowsCount;
    }

    public Integer getColsCount() {
        return colsCount;
    }

    public Plane colsCount(Integer colsCount) {
        this.colsCount = colsCount;
        return this;
    }

    public void setColsCount(Integer colsCount) {
        this.colsCount = colsCount;
    }

    public Boolean isDeleted() {
        return deleted;
    }

    public Plane deleted(Boolean deleted) {
        this.deleted = deleted;
        return this;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public Set<Seat> getSeats() {
        return seats;
    }

    public Plane seats(Set<Seat> seats) {
        this.seats = seats;
        return this;
    }

    public Plane addSeat(Seat seat) {
        this.seats.add(seat);
        seat.setPlane(this);
        return this;
    }

    public Plane removeSeat(Seat seat) {
        this.seats.remove(seat);
        seat.setPlane(null);
        return this;
    }

    public void setSeats(Set<Seat> seats) {
        this.seats = seats;
    }

    public Company getCompany() {
        return company;
    }

    public Plane company(Company company) {
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
        Plane plane = (Plane) o;
        if (plane.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), plane.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Plane{" +
            "id=" + getId() +
            ", manufacturer='" + getManufacturer() + "'" +
            ", model='" + getModel() + "'" +
            ", registration='" + getRegistration() + "'" +
            ", rowsCount=" + getRowsCount() +
            ", colsCount=" + getColsCount() +
            ", deleted='" + isDeleted() + "'" +
            "}";
    }
}
