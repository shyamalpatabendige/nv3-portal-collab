package com.novo3.shopfront.repository.xero.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class ContactLite {
    @JsonProperty("ContactID")
    private String contactId;
}
