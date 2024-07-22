package com.novo3.shopfront.repository.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "school_table")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SchoolEntity {

    @Id
    @GeneratedValue
    private Integer id;
    @Column(unique = true, length = 64)
    private String code;
    private String name;
    private String banner;
    @Column(length = 1000)
    private String description;
    private String img;
    @ManyToMany(mappedBy = "linkedSchools", fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private List<ProductEntity> products;
    @CreationTimestamp
    private Timestamp createdOn;
    @UpdateTimestamp
    private Timestamp updatedOn;
    @OneToMany(mappedBy = "school")
    List<OrderEntity> orders;
}
