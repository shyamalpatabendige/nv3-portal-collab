package com.novo3.shopfront.api.base;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class Accessory {

    private Integer id; //productAccessory ID
    private String name;
    private BigDecimal price;
    private List<String> features;
    private String shortDescription;
    private String description;
    private String notes;
    private String linkDescription;
    private String link;
    private String img;
    private String productCode;
}
