package com.novo3.shopfront.api.base;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Builder
public class Order {

    private Integer id;
    @NotNull (message = "Parent/Guardian information must not be empty.")
    private Parent parent;
    @NotNull (message = "Student information must not be empty.")
    private Student student;
    @NotNull(message = "Product details must not be empty.")
    @NotEmpty (message = "Product details must not be empty.")
    private List<String> productIds;
    private List<String> accessoryIds;
    private List<String> productNames;
    private List<String> accessoryNames;
    private List<Product> products;
    private List<Accessory> accessories;
    @NotNull (message = "School details must not be empty.")
    private School school;
    private String status;
    private String createdOn;
    private String updatedOn;

}
