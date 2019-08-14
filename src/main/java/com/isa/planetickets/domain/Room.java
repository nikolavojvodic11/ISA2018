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
 * A Room.
 */
@Entity
@Table(name = "room")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Room implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "beds_count")
    private Integer bedsCount;

    @Column(name = "jhi_label")
    private String label;

    @Column(name = "deleted")
    private Boolean deleted;

    @OneToMany(mappedBy = "room")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RoomPricelist> roomPricelists = new HashSet<>();
    @OneToMany(mappedBy = "room")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Image> images = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("rooms")
    private Hotel hotel;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getBedsCount() {
        return bedsCount;
    }

    public Room bedsCount(Integer bedsCount) {
        this.bedsCount = bedsCount;
        return this;
    }

    public void setBedsCount(Integer bedsCount) {
        this.bedsCount = bedsCount;
    }

    public String getLabel() {
        return label;
    }

    public Room label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Boolean isDeleted() {
        return deleted;
    }

    public Room deleted(Boolean deleted) {
        this.deleted = deleted;
        return this;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public Set<RoomPricelist> getRoomPricelists() {
        return roomPricelists;
    }

    public Room roomPricelists(Set<RoomPricelist> roomPricelists) {
        this.roomPricelists = roomPricelists;
        return this;
    }

    public Room addRoomPricelist(RoomPricelist roomPricelist) {
        this.roomPricelists.add(roomPricelist);
        roomPricelist.setRoom(this);
        return this;
    }

    public Room removeRoomPricelist(RoomPricelist roomPricelist) {
        this.roomPricelists.remove(roomPricelist);
        roomPricelist.setRoom(null);
        return this;
    }

    public void setRoomPricelists(Set<RoomPricelist> roomPricelists) {
        this.roomPricelists = roomPricelists;
    }

    public Set<Image> getImages() {
        return images;
    }

    public Room images(Set<Image> images) {
        this.images = images;
        return this;
    }

    public Room addImage(Image image) {
        this.images.add(image);
        image.setRoom(this);
        return this;
    }

    public Room removeImage(Image image) {
        this.images.remove(image);
        image.setRoom(null);
        return this;
    }

    public void setImages(Set<Image> images) {
        this.images = images;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public Room hotel(Hotel hotel) {
        this.hotel = hotel;
        return this;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
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
        Room room = (Room) o;
        if (room.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), room.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Room{" +
            "id=" + getId() +
            ", bedsCount=" + getBedsCount() +
            ", label='" + getLabel() + "'" +
            ", deleted='" + isDeleted() + "'" +
            "}";
    }
}
