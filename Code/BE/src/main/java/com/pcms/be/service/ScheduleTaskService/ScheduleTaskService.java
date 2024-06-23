package com.pcms.be.service.ScheduleTaskService;

import com.pcms.be.domain.Submission;
import com.pcms.be.repository.SubmissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleTaskService {
    private final SubmissionRepository submissionRepository;
    public Void InformDoTask(){
        OffsetDateTime now = OffsetDateTime.now();
        List<Submission> submissions = submissionRepository.findAll();
        int i = 1;

        for (Submission s : submissions){
            String subName = "abc" + i;
            s.setName(now.toString() + subName );
            i++;
            submissionRepository.save(s);
        }
        return null;
    }
}
