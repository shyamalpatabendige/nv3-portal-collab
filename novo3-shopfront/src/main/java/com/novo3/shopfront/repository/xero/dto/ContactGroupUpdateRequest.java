package com.novo3.shopfront.repository.xero.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class ContactGroupUpdateRequest {
    @JsonProperty("Contacts")
    private List<ContactLite> contacts;
}
