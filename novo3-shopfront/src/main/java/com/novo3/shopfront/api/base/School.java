package com.novo3.shopfront.api.base;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@Builder
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class School {
    private String name;
    @NotNull(message = "School code must not be empty.")
    private String code;
    private String banner;
    private String description;
    private String img;
    private Boolean isRepair;
}
