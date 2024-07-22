package com.novo3.shopfront.api.base;

import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Data
@Builder
public class Parent {

    @NotNull
    private String firstName;
    @NotNull
    private String lastName;
    @NotNull
    private Address address;
    @Email
    @NotNull
    private String email;
    @NotNull
    @Length(min = 9, max = 12)
    private String contactNumber;
}
