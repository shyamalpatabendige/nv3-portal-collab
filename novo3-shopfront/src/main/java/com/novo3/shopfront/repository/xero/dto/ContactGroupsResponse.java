package com.novo3.shopfront.repository.xero.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class ContactGroupsResponse {
    @JsonProperty("ContactGroups")
    private List<ContactGroup> contactGroups;
}
