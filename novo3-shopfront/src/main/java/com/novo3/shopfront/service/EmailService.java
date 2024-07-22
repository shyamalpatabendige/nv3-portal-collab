package com.novo3.shopfront.service;

import com.novo3.shopfront.api.base.Email;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.Arrays;

@Service
@Slf4j
@AllArgsConstructor
public class EmailService {

    private final JavaMailSender emailSender;

    public Boolean sendEmailWithAttachment(Email email) {

        log.info("Sending report, email={}", email);

        // for logging
        log.debug("emailTo: " + Arrays.asList(email.getReceivers()));
        log.debug("subject: " + email.getSubject());
        log.debug("message: " + email.getMessage());

        MimeMessage message = emailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(new InternetAddress(email.getSenderEmail(), email.getSenderName()));
            helper.setTo(email.getReceivers());
            helper.setSubject(email.getSubject());
            helper.setText(email.getMessage());

            if (email.getAttachment() != null) {
                log.info("attachFile: " + email.getAttachment().getName());
                FileSystemResource file = new FileSystemResource(new File(email.getAttachment().getFile()));
                helper.addAttachment(email.getAttachment().getName(), file);
            }

            emailSender.send(message);

        } catch (MessagingException e) {
            log.error("enable to send the email, exception={}", e.getMessage(), e);
            throw new RuntimeException(e);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }

        return Boolean.TRUE;
    }
}
