package com.novo3.shopfront.api.base;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    private Integer id;
    private String name;
    private BigDecimal price;
    private String description;
    private List<String> features;
    private String notes;
    private String imageUri;
    private String linkDescription;
    private String link;
    private String img;
    private String productCode;
    private List<Accessory> accessories;
}
