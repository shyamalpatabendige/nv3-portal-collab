package com.novo3.shopfront.repository.xero.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Phone {
    @JsonProperty(value = "PhoneType", defaultValue = "DEFAULT")
    private String phoneType;
    @JsonProperty("PhoneNumber")
    private String phoneNumber;
}
