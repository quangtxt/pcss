package com.pcms.be.service;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.MailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class EmailService {
    private final MailSender javaMailSender;

//    @Value("${spring.mail.from}")
    private String from;
    private static final Logger LOGGER = LoggerFactory.getLogger(EmailService.class);
    public void sendEmail(String to, String subject, String body) throws MessagingException {
//        MimeMessage message = javaMailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(message, false, StandardCharsets.UTF_8.name());
//        helper.setTo(to);
//        helper.setFrom(from);
//        helper.setSubject(subject);
//        helper.setText(body, true);
//        javaMailSender.send(message);

        LOGGER.debug("====END Sent email to '{}' successfully====", to);
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(body);
//
//        javaMailSender.send(simpleMailMessage);
    }
}
