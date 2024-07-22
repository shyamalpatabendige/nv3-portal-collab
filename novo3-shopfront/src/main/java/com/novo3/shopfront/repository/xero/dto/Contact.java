package com.novo3.shopfront.repository.xero.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Contact {
    @JsonProperty("ContactID")
    private String contactID;
    @JsonProperty("Name")
    private String name;
    @JsonProperty("FirstName")
    private String firstName;
    @JsonProperty("LastName")
    private String lastName;
    @JsonProperty("EmailAddress")
    private String emailAddress;
    @JsonProperty("Addresses")
    private List<Address> addresses;
    @JsonProperty("Phones")
    private List<Phone> phones;
    @JsonProperty("ContactPersons")
    private List<ContactPerson> contactPersons;
    @JsonProperty("ContactGroups")
    private List<ContactGroup> contactGroups;
}
