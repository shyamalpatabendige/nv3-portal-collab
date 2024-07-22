package com.novo3.shopfront.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Builder
@Getter
public class ServiceException extends RuntimeException{

    private int errorCode;

    public ServiceException (HttpStatus status, String message) {
        super(message);
        errorCode = status.value();
    }
}
