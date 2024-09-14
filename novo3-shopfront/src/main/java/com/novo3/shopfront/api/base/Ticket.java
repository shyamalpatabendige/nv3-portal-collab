package com.novo3.shopfront.api.base;

import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import java.util.List;

@Data
@Builder
public class Ticket {

    private String id;
    @NotEmpty
    private String name;
    @NotEmpty
    @Length(min = 9, max = 12)
    private String phone;
    @Email
    @NotEmpty
    private String email;
    @NotEmpty
    private String studentName;
    @Length(min = 1, max = 10)
    private String level;
    @Size(min = 1)
    private List<String> reason;
    @NotEmpty
    private String incidentDate;

}
