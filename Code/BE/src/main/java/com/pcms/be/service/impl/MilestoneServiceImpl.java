package com.pcms.be.service.impl;

import com.pcms.be.configuration.ScheduleConfig;
import com.pcms.be.domain.CapstonePhase;
import com.pcms.be.domain.Milestone;
import com.pcms.be.domain.MilestoneGroup;
import com.pcms.be.domain.Submission;
import com.pcms.be.domain.user.Group;
import com.pcms.be.domain.user.Member;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.functions.Constants;
import com.pcms.be.functions.Git;
import com.pcms.be.functions.MailTemplate;
import com.pcms.be.pojo.DTO.GitFolder;
import com.pcms.be.pojo.DTO.MilestoneDTO;
import com.pcms.be.pojo.request.CreatedMilestoneRequest;
import com.pcms.be.pojo.request.EditMilestoneRequest;
import com.pcms.be.repository.*;
import com.pcms.be.service.EmailService;
import com.pcms.be.service.MilestoneService;
import lombok.RequiredArgsConstructor;
import org.checkerframework.checker.nullness.Opt;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.time.OffsetDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class MilestoneServiceImpl implements MilestoneService {
    @Autowired
    private ScheduleConfig scheduleConfig;
    private final CapstonePhaseRepository capstonePhaseRepository;
    private final MilestoneRepository milestoneRepository;
    private final SubmissionRepository submissionRepository;
    private final ModelMapper modelMapper;
    private final GroupRepository groupRepository;
    private final MilestoneGroupRepository milestoneGroupRepository;
    private final EmailService emailService;

    @Override
    public ResponseEntity<MilestoneDTO> getById(int id) {
        Optional<Milestone> optMilestone = milestoneRepository.findById(Long.valueOf(id));
        if (optMilestone.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            Milestone milestone = optMilestone.orElseThrow();
            MilestoneDTO milestoneDTO = modelMapper.map(milestone, MilestoneDTO.class);
            return ResponseEntity.ok(milestoneDTO);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<String> createdMileStone(CreatedMilestoneRequest createdMilestoneRequest) throws ServiceException {
        try {
            Optional<CapstonePhase> capstonePhase = capstonePhaseRepository.findById(Long.valueOf(createdMilestoneRequest.getPhaseId()));
            if (capstonePhase.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            List<Milestone> milestones = milestoneRepository.findByPhaseIdAndDuration(createdMilestoneRequest.getPhaseId(), createdMilestoneRequest.getBeginAt(), createdMilestoneRequest.getDuration());
            if (!milestones.isEmpty()) {
                //int testdu = (int) createdMilestoneRequest.getDuration() * 7;
                //OffsetDateTime test  = createdMilestoneRequest.getBeginAt().plusDays(Long.valueOf(testdu));
                // List<Milestone> milestone = milestoneRepository.findByPhaseIdAndDuration(createdMilestoneRequest.getPhaseId(), createdMilestoneRequest.getBeginAt().plusDays(Long.valueOf(createdMilestoneRequest.getDuration() * 7)));
                throw new ServiceException(ErrorCode.MILESTONE_IS_CONFLICT_DATE);
            }
            OffsetDateTime now = OffsetDateTime.now();
            Milestone milestone = new Milestone();
            milestone.setName(createdMilestoneRequest.getName());
            if (!createdMilestoneRequest.getBeginAt().isBefore(now)) {
                milestone.setBeginAt(createdMilestoneRequest.getBeginAt());
            } else {
                return ResponseEntity.badRequest().body("Begin Date must be bigger than now");
            }
            milestone.setDuration(createdMilestoneRequest.getDuration());
            milestone.setPhase(capstonePhase.orElseThrow());
//            milestone.setStatus(Constants.MilestoneStatus.NonStart);


            if (!createdMilestoneRequest.getSubmissions().isEmpty()) {
                for (Submission s : createdMilestoneRequest.getSubmissions()) {
                    if (!s.dueDate.isAfter(now)) {
                        return ResponseEntity.badRequest().body("Due Date must be bigger than now");
                    }
                    if (!s.dueDate.isAfter(milestone.getBeginAt())) {
                        return ResponseEntity.badRequest().body("Due Date must be equal or bigger than Begin Date");
                    }
                    Submission submission = new Submission();
                    submission.setName(s.getName());
                    submission.setDescription(s.getDescription());
                    submission.setDueDate(s.getDueDate());
                    submission.setMilestone(milestone);
                    submissionRepository.save(submission);
                }
            }
            milestoneRepository.save(milestone);
            List<Group> groups = groupRepository.findAll();
            for (Group g : groups) {
                MilestoneGroup milestoneGroup = new MilestoneGroup();
                milestoneGroup.setGroup(g);
                milestoneGroup.setMilestone(milestone);
                milestoneGroup.setStatus(false);
                milestoneGroupRepository.save(milestoneGroup);
            }
            return ResponseEntity.ok("Create milestone successfully");
        } catch (ServiceException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<String> editMilestone(EditMilestoneRequest editMilestoneRequest) throws ServiceException {
        try {
            Optional<Milestone> optMilestone = milestoneRepository.findById(Long.valueOf(editMilestoneRequest.getMilestoneId()));
            if (optMilestone.isEmpty()) {
                return ResponseEntity.notFound().build();
            } else {
                OffsetDateTime now = OffsetDateTime.now();
                Milestone milestone = optMilestone.orElseThrow();
                if (!milestoneRepository.findByPhaseIdAndDurationAndDifferentCurrentMilestone(Integer.parseInt(milestone.getPhase().getId().toString()), editMilestoneRequest.getBeginAt().plusDays(Long.valueOf(editMilestoneRequest.getDuration()) * 7), editMilestoneRequest.getMilestoneId()).isEmpty()) {
                    throw new ServiceException(ErrorCode.MILESTONE_IS_CONFLICT_DATE);
                }
                milestone.setName(editMilestoneRequest.getName());
                if (!editMilestoneRequest.getBeginAt().isBefore(now)) {
                    milestone.setBeginAt(editMilestoneRequest.getBeginAt());
                } else {
                    return ResponseEntity.badRequest().body("Begin Date must be bigger than now");
                }
                milestone.setDuration(editMilestoneRequest.getDuration());
                milestoneRepository.save(milestone);
                return ResponseEntity.ok("Edit milestone successfully");
            }
        } catch (ServiceException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Optional<Milestone> findLatestMilestoneEndDate() {
        return milestoneRepository.findLatestMilestoneEndDate();
    }

    @Override
    public void setCronForSchedule() {
        Optional<Milestone> milestone = milestoneRepository.findLatestMilestoneEndDate();
        milestone.ifPresent(value -> scheduleConfig.setUpdateStatusMilestoneCron(getCronExpressionFromOffsetDateTime(value.getBeginAt().plusDays(value.getDuration() * 7))));
    }

    @Override
    @Transactional
    public void updateStatusMilestone() throws ServiceException {
        Optional<Milestone> optMilestone = milestoneRepository.findLatestMilestoneEndDate();
        List<String> listPath = new ArrayList<>();
        if (optMilestone.isPresent()) {
            Milestone milestone = optMilestone.get();
            String path = "Report/" + milestone.getPhase().getName() + "/" + milestone.getName();

            if (milestone.getSubmissions().isEmpty()) {
                path += "/" + milestone.getName();
                listPath.add(path);
            } else {
                for (Submission s : milestone.getSubmissions()) {
                     String pathSubmission = path + "/" + s.getName();
                    listPath.add(pathSubmission);
                }
            }
            List<Group> groups = groupRepository.findAll();
            for (Group gr : groups) {
                if (gr.getGitId() != null && !gr.getGitId().isEmpty()) {
                    for (String str : listPath) {
                        String href = Git.GitSrc.repositorySubTree.replace("_projectId-txt_", gr.getGitId()).replace("_SubtreeName-txt_", str);

                        List<GitFolder> gitFolders = getObjectByCallApiToGit(href);
                        if (!gitFolders.isEmpty() && checkSubmissionFolder(gitFolders, href)){
                            MilestoneGroup milestoneGroup = milestoneGroupRepository.findByGroupIdAndMilestoneId(Integer.parseInt(gr.getId().toString()), Integer.parseInt(milestone.getId().toString())).get();
                            milestoneGroup.setStatus(true);
                        }else{
                            for (Member m : gr.getMembers()){
                                String to = MailTemplate.MilestoneUnfinished.recipient.replace("_Email-txt_",m.getStudent().getUser().getEmail());
                                String subject = MailTemplate.MilestoneUnfinished.subject.replace("_Name-txt_", m.getStudent().getUser().getName());
                                String body = MailTemplate.MilestoneUnfinished.template.replace("_MilestoneName-txt_", milestone.getName());
                                emailService.sendEmail(to, subject, body);
                            }
                        }
                    }
                }
            }
        }
    }

    public List<GitFolder> getObjectByCallApiToGit(String hrefGit) throws ServiceException{
        try {
            RestTemplate restTemplate = new RestTemplate();

            // Thiết lập header
            HttpHeaders headers = new HttpHeaders();
            // Tạo httpEntity
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(headers);
            ParameterizedTypeReference<List<GitFolder>> typeRef = new ParameterizedTypeReference<List<GitFolder>>() {};
            ResponseEntity<List<GitFolder>> response = restTemplate.exchange(
                    hrefGit,
                    HttpMethod.GET,
                    entity,
                    typeRef
            );
            return response.getBody();
        } catch (HttpClientErrorException | HttpServerErrorException e ) {
            // Xử lý trường hợp API không tồn tại hoặc trả về lỗi
            throw new ServiceException(ErrorCode.GITLAB_IS_INCORRECT_FORMAT);
        } catch (Exception e) {
            // Xử lý các ngoại lệ khác
            throw new ServiceException(ErrorCode.GITLAB_IS_INCORRECT_FORMAT);
        }
    }
    private boolean checkSubmissionFolder(List<GitFolder> gitFolders, String pathRoot) throws ServiceException {
        List<GitFolder> sample = new ArrayList<>(gitFolders);
        for (GitFolder g : sample){
            if (g.getName().contains(".gitkeep")){
                gitFolders.remove(g);
            }
        }
        if (gitFolders.isEmpty()){
            return false;
        }
        List<String> listPath = new ArrayList<>();
        for (GitFolder g : gitFolders){
            if (g.getType().equals("blob")){
                return true;
            }else {
                String path = pathRoot + "/" +g.getPath();
                listPath.add(path);
            }
        }
        for (String str : listPath){
            return checkSubmissionFolder(getObjectByCallApiToGit(str), str);
        }

        return false;
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
