package com.isa.planetickets.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Seat.
 */
@Entity
@Table(name = "seat")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Seat implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_row")
    private Integer row;

    @Column(name = "col")
    private Integer col;

    @Column(name = "deleted")
    private Boolean deleted;

    @ManyToOne
    @JsonIgnoreProperties("seats")
    private Plane plane;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRow() {
        return row;
    }

    public Seat row(Integer row) {
        this.row = row;
        return this;
    }

    public void setRow(Integer row) {
        this.row = row;
    }

    public Integer getCol() {
        return col;
    }

    public Seat col(Integer col) {
        this.col = col;
        return this;
    }

    public void setCol(Integer col) {
        this.col = col;
    }

    public Boolean isDeleted() {
        return deleted;
    }

    public Seat deleted(Boolean deleted) {
        this.deleted = deleted;
        return this;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public Plane getPlane() {
        return plane;
    }

    public Seat plane(Plane plane) {
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
        Seat seat = (Seat) o;
        if (seat.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), seat.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Seat{" +
            "id=" + getId() +
            ", row=" + getRow() +
            ", col=" + getCol() +
            ", deleted='" + isDeleted() + "'" +
            "}";
    }
}
