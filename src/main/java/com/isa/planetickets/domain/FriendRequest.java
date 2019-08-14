package com.isa.planetickets.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A FriendRequest.
 */
@Entity
@Table(name = "friend_request")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FriendRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "accepted")
    private Boolean accepted;

    @Column(name = "deleted")
    private Boolean deleted;

    @ManyToOne
    @JsonIgnoreProperties("")
    private IsaUser sender;

    @ManyToOne
    @JsonIgnoreProperties("")
    private IsaUser reciver;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isAccepted() {
        return accepted;
    }

    public FriendRequest accepted(Boolean accepted) {
        this.accepted = accepted;
        return this;
    }

    public void setAccepted(Boolean accepted) {
        this.accepted = accepted;
    }

    public Boolean isDeleted() {
        return deleted;
    }

    public FriendRequest deleted(Boolean deleted) {
        this.deleted = deleted;
        return this;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public IsaUser getSender() {
        return sender;
    }

    public FriendRequest sender(IsaUser isaUser) {
        this.sender = isaUser;
        return this;
    }

    public void setSender(IsaUser isaUser) {
        this.sender = isaUser;
    }

    public IsaUser getReciver() {
        return reciver;
    }

    public FriendRequest reciver(IsaUser isaUser) {
        this.reciver = isaUser;
        return this;
    }

    public void setReciver(IsaUser isaUser) {
        this.reciver = isaUser;
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
        FriendRequest friendRequest = (FriendRequest) o;
        if (friendRequest.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), friendRequest.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FriendRequest{" +
            "id=" + getId() +
            ", accepted='" + isAccepted() + "'" +
            ", deleted='" + isDeleted() + "'" +
            "}";
    }
}
