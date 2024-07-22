package com.novo3.shopfront.repository.xero.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ContactRequest {
    @JsonProperty("Contacts")
    private List<Contact> contacts;

}