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
 * A Company.
 */
@Entity
@Table(name = "company")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Company implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "parentCompany")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CompanyLocation> companyLocations = new HashSet<>();
    @OneToMany(mappedBy = "company")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Plane> planes = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("")
    private CompanyType companyType;

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

    public Company name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Company description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<CompanyLocation> getCompanyLocations() {
        return companyLocations;
    }

    public Company companyLocations(Set<CompanyLocation> companyLocations) {
        this.companyLocations = companyLocations;
        return this;
    }

    public Company addCompanyLocation(CompanyLocation companyLocation) {
        this.companyLocations.add(companyLocation);
        companyLocation.setParentCompany(this);
        return this;
    }

    public Company removeCompanyLocation(CompanyLocation companyLocation) {
        this.companyLocations.remove(companyLocation);
        companyLocation.setParentCompany(null);
        return this;
    }

    public void setCompanyLocations(Set<CompanyLocation> companyLocations) {
        this.companyLocations = companyLocations;
    }

    public Set<Plane> getPlanes() {
        return planes;
    }

    public Company planes(Set<Plane> planes) {
        this.planes = planes;
        return this;
    }

    public Company addPlane(Plane plane) {
        this.planes.add(plane);
        plane.setCompany(this);
        return this;
    }

    public Company removePlane(Plane plane) {
        this.planes.remove(plane);
        plane.setCompany(null);
        return this;
    }

    public void setPlanes(Set<Plane> planes) {
        this.planes = planes;
    }

    public CompanyType getCompanyType() {
        return companyType;
    }

    public Company companyType(CompanyType companyType) {
        this.companyType = companyType;
        return this;
    }

    public void setCompanyType(CompanyType companyType) {
        this.companyType = companyType;
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
        Company company = (Company) o;
        if (company.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), company.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Company{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
