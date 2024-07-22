package com.novo3.shopfront.validation;

import com.novo3.shopfront.api.base.UserRegistration;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class EmailMatchValidator implements ConstraintValidator<EmailMatch, UserRegistration> {

    @Override
    public void initialize(EmailMatch p) {

    }

    public boolean isValid(UserRegistration user, ConstraintValidatorContext c) {
        String email = user.getUsername();
        String confirmEmail = user.getConfirmEmail();

        if(email == null || !email.equals(confirmEmail)) {
            return false;
        }

        return true;
    }

}