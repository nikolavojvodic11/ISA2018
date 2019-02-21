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
 * A CompanyLocation.
 */
@Entity
@Table(name = "company_location")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CompanyLocation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "address")
    private String address;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    @OneToMany(mappedBy = "companyLocation")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Car> cars = new HashSet<>();
    @OneToMany(mappedBy = "companyLocation")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Hotel> hotels = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("")
    private City city;

    @ManyToOne
    @JsonIgnoreProperties("companyLocations")
    private Company company;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public CompanyLocation address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public CompanyLocation phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public CompanyLocation email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Car> getCars() {
        return cars;
    }

    public CompanyLocation cars(Set<Car> cars) {
        this.cars = cars;
        return this;
    }

    public CompanyLocation addCar(Car car) {
        this.cars.add(car);
        car.setCompanyLocation(this);
        return this;
    }

    public CompanyLocation removeCar(Car car) {
        this.cars.remove(car);
        car.setCompanyLocation(null);
        return this;
    }

    public void setCars(Set<Car> cars) {
        this.cars = cars;
    }

    public Set<Hotel> getHotels() {
        return hotels;
    }

    public CompanyLocation hotels(Set<Hotel> hotels) {
        this.hotels = hotels;
        return this;
    }

    public CompanyLocation addHotel(Hotel hotel) {
        this.hotels.add(hotel);
        hotel.setCompanyLocation(this);
        return this;
    }

    public CompanyLocation removeHotel(Hotel hotel) {
        this.hotels.remove(hotel);
        hotel.setCompanyLocation(null);
        return this;
    }

    public void setHotels(Set<Hotel> hotels) {
        this.hotels = hotels;
    }

    public City getCity() {
        return city;
    }

    public CompanyLocation city(City city) {
        this.city = city;
        return this;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public Company getCompany() {
        return company;
    }

    public CompanyLocation company(Company company) {
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
        CompanyLocation companyLocation = (CompanyLocation) o;
        if (companyLocation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), companyLocation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CompanyLocation{" +
            "id=" + getId() +
            ", address='" + getAddress() + "'" +
            ", phone='" + getPhone() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
