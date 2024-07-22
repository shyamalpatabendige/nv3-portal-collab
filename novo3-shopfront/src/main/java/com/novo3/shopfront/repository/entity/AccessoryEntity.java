package com.novo3.shopfront.repository.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "accessory_table")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccessoryEntity {

    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private BigDecimal price;
    @OneToMany(mappedBy = "accessory", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.SUBSELECT)
    private List<AccessoryFeatureEntity> accessoryFeatures;
    private String shortDescription;
    private String description;
    private String notes;
    private String linkDescription;
    private String link;
    private String img;
    @OneToMany(mappedBy = "accessory", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.SUBSELECT)
    private List<ProductAccessoryEntity> productAccessoryEntities;
    @CreationTimestamp
    private Timestamp createdOn;
    @UpdateTimestamp
    private Timestamp updatedOn;

}