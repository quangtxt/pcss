package com.pcms.be.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import java.time.OffsetDateTime;

@Configuration
@PropertySource("classpath:schedule-config.properties")
public class ScheduleConfig {
    @Value("${updateStatusMilestone.cron}")
    private String updateStatusMilestoneCron;

    public String getUpdateStatusMilestoneCron() {
        return updateStatusMilestoneCron;
    }

    public void setUpdateStatusMilestoneCron(String updateStatusMilestoneCron) {
        this.updateStatusMilestoneCron = updateStatusMilestoneCron;
    }
}
