package com.novo3.shopfront.repository.xero.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Address {
    @JsonProperty(value = "AddressType", defaultValue = "STREET")
    private String addressType;
    @JsonProperty("AddressLine1")
    private String addressLine1;
    @JsonProperty("AddressLine2")
    private String addressLine2;
    @JsonProperty("City")
    private String city;
    @JsonProperty("Region")
    private String region;
    @JsonProperty("PostalCode")
    private String postalCode;
}
