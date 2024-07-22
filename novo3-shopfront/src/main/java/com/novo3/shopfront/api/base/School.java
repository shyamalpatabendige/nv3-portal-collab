package com.novo3.shopfront.api.base;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@Builder
@AllArgsConstructor
public class School {
    private String name;
    @NotNull(message = "School code must not be empty.")
    private String code;
    private String banner;
    private String description;
    private String img;
}
