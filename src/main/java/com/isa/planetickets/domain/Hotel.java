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
 * A Hotel.
 */
@Entity
@Table(name = "hotel")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Hotel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "address")
    private String address;

    @Column(name = "stars")
    private Integer stars;

    @Column(name = "lat")
    private Double lat;

    @Column(name = "lng")
    private Double lng;

    @Column(name = "deleted")
    private Boolean deleted;

    @OneToMany(mappedBy = "hotel")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Room> rooms = new HashSet<>();
    @OneToMany(mappedBy = "hotel")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Image> images = new HashSet<>();
    @OneToMany(mappedBy = "hotel")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AvailableHotelService> availableHotelServices = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("hotels")
    private CompanyLocation companyLocation;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Hotel name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Hotel description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public Hotel address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getStars() {
        return stars;
    }

    public Hotel stars(Integer stars) {
        this.stars = stars;
        return this;
    }

    public void setStars(Integer stars) {
        this.stars = stars;
    }

    public Double getLat() {
        return lat;
    }

    public Hotel lat(Double lat) {
        this.lat = lat;
        return this;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        return lng;
    }

    public Hotel lng(Double lng) {
        this.lng = lng;
        return this;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public Boolean isDeleted() {
        return deleted;
    }

    public Hotel deleted(Boolean deleted) {
        this.deleted = deleted;
        return this;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public Set<Room> getRooms() {
        return rooms;
    }

    public Hotel rooms(Set<Room> rooms) {
        this.rooms = rooms;
        return this;
    }

    public Hotel addRoom(Room room) {
        this.rooms.add(room);
        room.setHotel(this);
        return this;
    }

    public Hotel removeRoom(Room room) {
        this.rooms.remove(room);
        room.setHotel(null);
        return this;
    }

    public void setRooms(Set<Room> rooms) {
        this.rooms = rooms;
    }

    public Set<Image> getImages() {
        return images;
    }

    public Hotel images(Set<Image> images) {
        this.images = images;
        return this;
    }

    public Hotel addImage(Image image) {
        this.images.add(image);
        image.setHotel(this);
        return this;
    }

    public Hotel removeImage(Image image) {
        this.images.remove(image);
        image.setHotel(null);
        return this;
    }

    public void setImages(Set<Image> images) {
        this.images = images;
    }

    public Set<AvailableHotelService> getAvailableHotelServices() {
        return availableHotelServices;
    }

    public Hotel availableHotelServices(Set<AvailableHotelService> availableHotelServices) {
        this.availableHotelServices = availableHotelServices;
        return this;
    }

    public Hotel addAvailableHotelService(AvailableHotelService availableHotelService) {
        this.availableHotelServices.add(availableHotelService);
        availableHotelService.setHotel(this);
        return this;
    }

    public Hotel removeAvailableHotelService(AvailableHotelService availableHotelService) {
        this.availableHotelServices.remove(availableHotelService);
        availableHotelService.setHotel(null);
        return this;
    }

    public void setAvailableHotelServices(Set<AvailableHotelService> availableHotelServices) {
        this.availableHotelServices = availableHotelServices;
    }

    public CompanyLocation getCompanyLocation() {
        return companyLocation;
    }

    public Hotel companyLocation(CompanyLocation companyLocation) {
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
        Hotel hotel = (Hotel) o;
        if (hotel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), hotel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Hotel{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", address='" + getAddress() + "'" +
            ", stars=" + getStars() +
            ", lat=" + getLat() +
            ", lng=" + getLng() +
            ", deleted='" + isDeleted() + "'" +
            "}";
    }
}
