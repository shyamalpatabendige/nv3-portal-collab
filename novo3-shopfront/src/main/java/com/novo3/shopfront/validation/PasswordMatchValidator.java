package com.novo3.shopfront.validation;

import com.novo3.shopfront.api.base.UserRegistration;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordMatchValidator implements ConstraintValidator<PasswordMatch, UserRegistration> {

    @Override
    public void initialize(PasswordMatch p) {

    }

    public boolean isValid(UserRegistration user, ConstraintValidatorContext c) {
        String password = user.getPassword();
        String confirmPassword = user.getConfirmPassword();

        if(password == null || !password.equals(confirmPassword)) {
            return false;
        }

        return true;
    }

}