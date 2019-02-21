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
 * A IsaUser.
 */
@Entity
@Table(name = "isa_user")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class IsaUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "phone")
    private String phone;

    @Column(name = "first_login")
    private Boolean firstLogin;

    @OneToOne    @JoinColumn(unique = true)
    private User jhiUser;

    @ManyToOne
    @JsonIgnoreProperties("")
    private City city;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Company company;

    @OneToMany(mappedBy = "user")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Reservation> reservations = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhone() {
        return phone;
    }

    public IsaUser phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Boolean isFirstLogin() {
        return firstLogin;
    }

    public IsaUser firstLogin(Boolean firstLogin) {
        this.firstLogin = firstLogin;
        return this;
    }

    public void setFirstLogin(Boolean firstLogin) {
        this.firstLogin = firstLogin;
    }

    public User getJhiUser() {
        return jhiUser;
    }

    public IsaUser jhiUser(User user) {
        this.jhiUser = user;
        return this;
    }

    public void setJhiUser(User user) {
        this.jhiUser = user;
    }

    public City getCity() {
        return city;
    }

    public IsaUser city(City city) {
        this.city = city;
        return this;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public Company getCompany() {
        return company;
    }

    public IsaUser company(Company company) {
        this.company = company;
        return this;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Set<Reservation> getReservations() {
        return reservations;
    }

    public IsaUser reservations(Set<Reservation> reservations) {
        this.reservations = reservations;
        return this;
    }

    public IsaUser addReservation(Reservation reservation) {
        this.reservations.add(reservation);
        reservation.setUser(this);
        return this;
    }

    public IsaUser removeReservation(Reservation reservation) {
        this.reservations.remove(reservation);
        reservation.setUser(null);
        return this;
    }

    public void setReservations(Set<Reservation> reservations) {
        this.reservations = reservations;
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
        IsaUser isaUser = (IsaUser) o;
        if (isaUser.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), isaUser.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IsaUser{" +
            "id=" + getId() +
            ", phone='" + getPhone() + "'" +
            ", firstLogin='" + isFirstLogin() + "'" +
            "}";
    }
}
