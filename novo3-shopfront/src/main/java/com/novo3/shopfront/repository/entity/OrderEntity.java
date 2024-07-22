package com.novo3.shopfront.repository.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "order_table")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderEntity {

    @TableGenerator(name = "order_gen", table = "ID_GEN", pkColumnName = "GEN_NAME", valueColumnName = "GEN_VALUE", pkColumnValue = "order_gen", initialValue = 10000)
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "order_gen")
    private Integer id;
    private String parentFirstName;
    private String parentLastName;
    private String address1;
    private String address2;
    private String suburb;
    private String state;
    private String postcode;
    private String email;
    private String contactNumber;
    private String studentFirstName;
    private String studentPreferredName;
    private String studentLastName;
    private String studentId;
    private String level;
    @ManyToOne (fetch = FetchType.EAGER)
    @JoinColumn(name = "school_id", nullable = false)
    private SchoolEntity school;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.SUBSELECT)
    private List<ItemEntity> items;
    private String status;
    @CreationTimestamp
    private Timestamp createdOn;
    @UpdateTimestamp
    private Timestamp updatedOn;

}
