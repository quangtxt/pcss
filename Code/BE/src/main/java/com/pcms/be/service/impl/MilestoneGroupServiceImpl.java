package com.pcms.be.service.impl;

import com.pcms.be.domain.MilestoneGroup;
import com.pcms.be.domain.user.Group;
import com.pcms.be.domain.user.Member;
import com.pcms.be.functions.NotificationTemplate;
import com.pcms.be.repository.MilestoneGroupRepository;
import com.pcms.be.service.MilestoneGroupService;
import com.pcms.be.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@RequiredArgsConstructor
public class MilestoneGroupServiceImpl implements MilestoneGroupService {
    private final MilestoneGroupRepository milestoneGroupRepository;
    private final NotificationService notificationService;
    @Override
    public void checkingProcess() {//chua test
    }
}
