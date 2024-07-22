package com.novo3.shopfront.api.base;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class Email {

    private String senderEmail;
    private String senderName;
    private String[] receivers;
    private String subject;
    private String message;
    private Attachment attachment;

}
