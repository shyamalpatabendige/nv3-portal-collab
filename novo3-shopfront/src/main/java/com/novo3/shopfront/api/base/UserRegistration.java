package com.novo3.shopfront.api.base;

import com.novo3.shopfront.validation.EmailMatch;
import com.novo3.shopfront.validation.PasswordMatch;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@PasswordMatch(message="Passwords do not match")
@EmailMatch(message="Emails do not match")
public class UserRegistration extends User {

    @NotEmpty(message = "Confirm Email must not be empty")
    private String confirmEmail;

    @NotEmpty(message = "Confirm password must not be empty")
    private String confirmPassword;
}
