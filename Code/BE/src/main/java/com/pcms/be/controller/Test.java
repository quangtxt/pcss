package com.pcms.be.controller;

import com.pcms.be.configuration.ScheduleConfig;
import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.functions.ValidateData;
import com.pcms.be.service.MilestoneGroupService;
import com.pcms.be.service.MilestoneService;
import com.pcms.be.service.ScheduleTaskService.ScheduleTaskService;
import jakarta.annotation.PostConstruct;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.util.logging.Logger;


@Slf4j
@RestController
@RequestMapping("/api/v1/test")
@RequiredArgsConstructor
public class Test {
    private final MilestoneService milestoneService;
    @GetMapping("/a")
    public ResponseEntity<String> test() throws ServiceException {
       try {
           milestoneService.updateStatusMilestone();
           return ResponseEntity.ok("a");
       } catch (ServiceException e) {
           throw new ApiException(e.getErrorCode(), e.getParams());
       } catch (MessagingException e) {
           throw new RuntimeException(e);
       }
    }
}
