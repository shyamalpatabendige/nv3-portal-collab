package com.novo3.shopfront.api.base;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@Builder
public class Address {
    @NotNull
    private String address1;
    private String address2;
    @NotNull
    private String suburb;
    @NotNull
    private String state;
    @NotNull
    private String postcode;
}
