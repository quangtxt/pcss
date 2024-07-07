package com.pcms.be.service.impl;

import com.pcms.be.domain.Milestone;
import com.pcms.be.domain.MilestoneGroup;
import com.pcms.be.domain.Submission;
import com.pcms.be.domain.user.Group;
import com.pcms.be.domain.user.Member;
import com.pcms.be.domain.user.User;
import com.pcms.be.functions.NotificationTemplate;
import com.pcms.be.repository.MilestoneGroupRepository;
import com.pcms.be.repository.NotificationRepository;
import com.pcms.be.repository.SubmissionRepository;
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
    private final SubmissionRepository submissionRepository;
    private final MilestoneGroupRepository milestoneGroupRepository;
    private final NotificationService notificationService;
    @Override
    public void checkingProcess() {//chua test
        OffsetDateTime now = OffsetDateTime.now();
        OffsetDateTime dueDate = now.plus(3, ChronoUnit.DAYS);
        List<Submission> submissions = submissionRepository.findAllSubmissionByDueDate(dueDate);
        Set<Milestone> milestones = new HashSet<>();
        List<MilestoneGroup> milestoneGroups = new ArrayList<>();
        for (Submission s : submissions){
           milestones.add(s.getMilestone());
        }
        for (Milestone m : milestones){
            List<MilestoneGroup> milestoneGroup = milestoneGroupRepository.findAllByMilestoneId(Integer.parseInt(m.getId().toString()));
            for (MilestoneGroup mg : milestoneGroup){
                if (!mg.isStatus()){
                    Map<String, String> map = new HashMap<>();
                    map.put("_MilestoneName-txt_", m.getName());
                    String content = notificationService.createContentNotification(NotificationTemplate.MilestoneProcessNotification.unfinishedSubmissionTemplate, map);
                    Group group = mg.getGroup();
                    for (Member mb : group.getMembers()){
                        notificationService.saveNotification(mb.getStudent().getUser(), content);
                    }
                }
            }
        }
    }
}
