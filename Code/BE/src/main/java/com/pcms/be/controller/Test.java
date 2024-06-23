package com.pcms.be.controller;

import com.pcms.be.service.ScheduleTaskService.ScheduleTaskService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.OffsetDateTime;
import java.util.logging.Logger;

@RequiredArgsConstructor
@Slf4j
@Component
public class Test {
    private final ScheduleTaskService scheduleTaskService;
    @Scheduled(cron = "0 0 0 * * ?")
    public Void test(){
        OffsetDateTime now = OffsetDateTime.now();
        log.info(now.toString());
        scheduleTaskService.InformDoTask();
        return null;
    }
}
