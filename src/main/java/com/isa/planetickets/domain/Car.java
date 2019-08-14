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

import com.isa.planetickets.domain.enumeration.CarType;

/**
 * A Car.
 */
@Entity
@Table(name = "car")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Car implements Serializable {

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

    @Column(name = "seats")
    private Integer seats;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private CarType type;

    @Column(name = "price")
    private Double price;

    @Column(name = "discount")
    private Integer discount;

    @Column(name = "deleted")
    private Boolean deleted;

    @OneToMany(mappedBy = "car")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Image> images = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("cars")
    private CompanyLocation companyLocation;

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

    public Car manufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
        return this;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getModel() {
        return model;
    }

    public Car model(String model) {
        this.model = model;
        return this;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getRegistration() {
        return registration;
    }

    public Car registration(String registration) {
        this.registration = registration;
        return this;
    }

    public void setRegistration(String registration) {
        this.registration = registration;
    }

    public Integer getSeats() {
        return seats;
    }

    public Car seats(Integer seats) {
        this.seats = seats;
        return this;
    }

    public void setSeats(Integer seats) {
        this.seats = seats;
    }

    public CarType getType() {
        return type;
    }

    public Car type(CarType type) {
        this.type = type;
        return this;
    }

    public void setType(CarType type) {
        this.type = type;
    }

    public Double getPrice() {
        return price;
    }

    public Car price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getDiscount() {
        return discount;
    }

    public Car discount(Integer discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public Boolean isDeleted() {
        return deleted;
    }

    public Car deleted(Boolean deleted) {
        this.deleted = deleted;
        return this;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public Set<Image> getImages() {
        return images;
    }

    public Car images(Set<Image> images) {
        this.images = images;
        return this;
    }

    public Car addImage(Image image) {
        this.images.add(image);
        image.setCar(this);
        return this;
    }

    public Car removeImage(Image image) {
        this.images.remove(image);
        image.setCar(null);
        return this;
    }

    public void setImages(Set<Image> images) {
        this.images = images;
    }

    public CompanyLocation getCompanyLocation() {
        return companyLocation;
    }

    public Car companyLocation(CompanyLocation companyLocation) {
        this.companyLocation = companyLocation;
        return this;
    }

    public void setCompanyLocation(CompanyLocation companyLocation) {
        this.companyLocation = companyLocation;
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
        Car car = (Car) o;
        if (car.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), car.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Car{" +
            "id=" + getId() +
            ", manufacturer='" + getManufacturer() + "'" +
            ", model='" + getModel() + "'" +
            ", registration='" + getRegistration() + "'" +
            ", seats=" + getSeats() +
            ", type='" + getType() + "'" +
            ", price=" + getPrice() +
            ", discount=" + getDiscount() +
            ", deleted='" + isDeleted() + "'" +
            "}";
    }
}
