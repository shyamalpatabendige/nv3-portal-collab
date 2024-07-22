package com.novo3.shopfront.repository.xero.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ContactGroupsRequest {
    @JsonProperty("Name")
    private String name;
}
