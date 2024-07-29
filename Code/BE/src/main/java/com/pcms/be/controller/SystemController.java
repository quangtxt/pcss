package com.pcms.be.controller;

import com.pcms.be.configuration.ScheduleConfig;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.service.MilestoneGroupService;
import com.pcms.be.service.MilestoneService;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.OffsetDateTime;

//@RequiredArgsConstructor
@Slf4j
@Component
public class SystemController {
    @Autowired
    private  ScheduleConfig scheduleConfig;
    @Autowired
    private MilestoneGroupService milestoneGroupService;
    @Autowired
    private MilestoneService milestoneService;
    @PostConstruct
    public void setCronForSchedule(){
        log.info("setCronForSchedule");
//        Optional<Milestone> milestone = milestoneService.findLatestMilestoneEndDate();
//        scheduleConfig.setUpdateStatusMilestoneCron(getCronExpressionFromOffsetDateTime(milestone.get().getBeginAt().plusDays(milestone.get().getDuration()*7)));
//        log.info(scheduleConfig.getUpdateStatusMilestoneCron());
        milestoneService.setCronForSchedule();
        log.info(scheduleConfig.getUpdateStatusMilestoneCron());
    }

    @Scheduled(cron = "0 0 0 * * ?")// can lam them mail
    public void CreateReminderNotifications(){
        milestoneGroupService.checkingProcess();
    }

    //    @Scheduled(cron = "#{T(org.springframework.beans.factory.annotation).getBean('scheduleConfig').getUpdateStatusMilestoneCron()}")
    @Scheduled(cron = "#{@scheduleConfig.getUpdateStatusMilestoneCron()}")
    public void UpdateStatusMilestone() throws ServiceException {
        log.info("Function da chay");
        milestoneService.updateStatusMilestone();
        log.info(scheduleConfig.getUpdateStatusMilestoneCron());
    }

    private String getCronExpressionFromOffsetDateTime(OffsetDateTime offsetDateTime) {
        // Lấy các thành phần của OffsetDateTime
        int second = offsetDateTime.getSecond();
        int minute = offsetDateTime.getMinute();
        int hour = offsetDateTime.getHour();
        int dayOfMonth = offsetDateTime.getDayOfMonth();
        int month = offsetDateTime.getMonthValue();

        // Tạo cron expression
        // Cấu trúc cron expression: "seconds minutes hours dayOfMonth month *"
        return String.format("%d %d %d %d %d *", second, minute, hour, dayOfMonth, month);
    }

}
