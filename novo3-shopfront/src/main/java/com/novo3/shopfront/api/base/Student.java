package com.novo3.shopfront.api.base;

import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@Builder
public class Student {
    @NotEmpty
    private String firstName;
    private String preferredName;
    @NotEmpty
    private String lastName;
    private String id;
    @NotNull
    @Length(min = 1, max = 10)
    private String level;
}
