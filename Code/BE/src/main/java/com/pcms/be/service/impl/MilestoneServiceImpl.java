package com.pcms.be.service.impl;

import com.pcms.be.configuration.ScheduleConfig;
import com.pcms.be.domain.Milestone;
import com.pcms.be.domain.MilestoneGroup;
import com.pcms.be.domain.Semester;
import com.pcms.be.domain.Semester_Milestone;
import com.pcms.be.domain.user.Group;
import com.pcms.be.domain.user.Member;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.functions.Git;
import com.pcms.be.functions.MailTemplate;
import com.pcms.be.functions.NotificationTemplate;
import com.pcms.be.pojo.DTO.GitFolder;
import com.pcms.be.pojo.DTO.MilestoneDTO;
import com.pcms.be.pojo.DTO.SemesterMilestone2DTO;
import com.pcms.be.pojo.request.CreatedMilestoneRequest;
import com.pcms.be.pojo.request.EditMilestoneRequest;
import com.pcms.be.repository.*;
import com.pcms.be.service.EmailService;
import com.pcms.be.service.MilestoneService;
import com.pcms.be.service.NotificationService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MilestoneServiceImpl implements MilestoneService {
    @Autowired
    private ScheduleConfig scheduleConfig;
    private final MilestoneRepository milestoneRepository;
    private final SemesterRepository semesterRepository;
    private final SemesterMilestoneRepository semesterMilestoneRepository;
    private final ModelMapper modelMapper;
    private final GroupRepository groupRepository;
    private final MilestoneGroupRepository milestoneGroupRepository;
    private final EmailService emailService;
    private final NotificationService notificationService;

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
//        try {
//            Optional<CapstonePhase> capstonePhase = capstonePhaseRepository.findById(Long.valueOf(createdMilestoneRequest.getPhaseId()));
//            if (capstonePhase.isEmpty()) {
//                return ResponseEntity.notFound().build();
//            }
//            List<Milestone> milestones = milestoneRepository.findByPhaseIdAndDuration(createdMilestoneRequest.getPhaseId(), createdMilestoneRequest.getBeginAt(), createdMilestoneRequest.getDuration());
//            if (!milestones.isEmpty()) {
//                //int testdu = (int) createdMilestoneRequest.getDuration() * 7;
//                //OffsetDateTime test  = createdMilestoneRequest.getBeginAt().plusDays(Long.valueOf(testdu));
//                // List<Milestone> milestone = milestoneRepository.findByPhaseIdAndDuration(createdMilestoneRequest.getPhaseId(), createdMilestoneRequest.getBeginAt().plusDays(Long.valueOf(createdMilestoneRequest.getDuration() * 7)));
//                throw new ServiceException(ErrorCode.MILESTONE_IS_CONFLICT_DATE);
//            }
//            OffsetDateTime now = OffsetDateTime.now();
//            Milestone milestone = new Milestone();
//            milestone.setName(createdMilestoneRequest.getName());
//            if (!createdMilestoneRequest.getBeginAt().isBefore(now)) {
//                milestone.setBeginAt(createdMilestoneRequest.getBeginAt());
//            } else {
//                return ResponseEntity.badRequest().body("Begin Date must be bigger than now");
//            }
//            milestone.setDuration(createdMilestoneRequest.getDuration());
//            milestone.setPhase(capstonePhase.orElseThrow());
////            milestone.setStatus(Constants.MilestoneStatus.NonStart);
//
//
//            if (!createdMilestoneRequest.getSubmissions().isEmpty()) {
//                for (Submission s : createdMilestoneRequest.getSubmissions()) {
//                    if (!s.dueDate.isAfter(now)) {
//                        return ResponseEntity.badRequest().body("Due Date must be bigger than now");
//                    }
//                    if (!s.dueDate.isAfter(milestone.getBeginAt())) {
//                        return ResponseEntity.badRequest().body("Due Date must be equal or bigger than Begin Date");
//                    }
//                    Submission submission = new Submission();
//                    submission.setName(s.getName());
//                    submission.setDescription(s.getDescription());
//                    submission.setDueDate(s.getDueDate());
//                    submission.setMilestone(milestone);
//                    submissionRepository.save(submission);
//                }
//            }
//            milestoneRepository.save(milestone);
//            List<Group> groups = groupRepository.findAll();
//            for (Group g : groups) {
//                MilestoneGroup milestoneGroup = new MilestoneGroup();
//                milestoneGroup.setGroup(g);
//                milestoneGroup.setMilestone(milestone);
//                milestoneGroup.setStatus(false);
//                milestoneGroupRepository.save(milestoneGroup);
//            }
//            return ResponseEntity.ok("Create milestone successfully");
//        } catch (ServiceException e) {
//            throw new RuntimeException(e);
//        }
        return null;
    }



    @Override
    public void setCronForSchedule() {
        Optional<Semester_Milestone> milestone = semesterMilestoneRepository.findLatestSemesterMilestone();
        milestone.ifPresent(value -> scheduleConfig.setUpdateStatusMilestoneCron(getCronExpressionFromOffsetDateTime(value.getEndDate())));
    }

    @Override
    @Transactional
    public void updateStatusMilestone() throws ServiceException, MessagingException {
        OffsetDateTime now = OffsetDateTime.now();
        Optional<Semester> optSemester = semesterRepository.findByCurrent(now);
        if (optSemester.isEmpty()){
            throw new ServiceException(ErrorCode.SEMESTER_NOT_FOUND_BY_CURRENT);
        }
        OffsetDateTime cron = getOffsetDateTimeFromCronExpression(scheduleConfig.getUpdateStatusMilestoneCron());
        List<Semester_Milestone> semesterMilestones = semesterMilestoneRepository.findByEndDate(cron.toLocalDateTime());
        List<Group> groups = optSemester.get().getGroups();
        if (semesterMilestones != null && !semesterMilestones.isEmpty()){
            for (Semester_Milestone sm : semesterMilestones){
                String path = "";
                if (sm.getMilestone() != null){
                    Milestone milestone = sm.getMilestone();
                    //path = milestone.getName();
                    while (milestone.getParent() != null){
                        Optional<Milestone> parentMilestone = milestoneRepository.findById(milestone.getParent());
                        if (parentMilestone.isPresent()){
                            milestone = parentMilestone.get();
                            path = milestone.getName() + "/" + path;
                        }else{
                            break;
                        }
                    }
                    path = path.substring(0, path.length() - 1);
                    for (Group gr : groups){
                        String href = Git.GitSrc.repositorySubTree.replace("_projectId-txt_", gr.getGitId()).replace("_SubtreeName-txt_", path);
                        List<GitFolder> gitFolder = getObjectByCallApiToGit(href);
                        Optional<MilestoneGroup> milestoneGroup = milestoneGroupRepository.findByGroupIdAndMilestoneId(Integer.parseInt(gr.getId().toString()), Integer.parseInt(sm.getMilestone().getId().toString()));
                        if (milestoneGroup.isEmpty()){
                            continue;
                        }
                        if (gitFolder == null || gitFolder.isEmpty()){
                            for (Member m : gr.getMembers()){
                                Map<String, String> map = new HashMap<>();
                                map.put("_MilestoneName-txt_", milestone.getName());
                                String content = notificationService.createContentNotification(NotificationTemplate.MilestoneProcessNotification.cannotFindInGit, map);
                                notificationService.saveNotification(m.getStudent().getUser(), content);
                                String to = MailTemplate.MilestoneUnfinished.recipient.replace("_Email-txt_",m.getStudent().getUser().getEmail());
                                String subject = MailTemplate.MilestoneUnfinished.subject.replace("_Name-txt_", m.getStudent().getUser().getName());
                                String body = MailTemplate.MilestoneUnfinished.template.replace("_MilestoneName-txt_", milestone.getName());
                                emailService.sendEmail(to, subject, body);
                            }
                            milestoneGroup.get().setStatus(false);
                            milestoneGroupRepository.save(milestoneGroup.get());
                        }else{
                            milestoneGroup.get().setStatus(checkSubmission(gitFolder, sm.getMilestone()));
//                            milestoneGroup.get().setStatus(true);
                            milestoneGroupRepository.save(milestoneGroup.get());
                        }
//                        if (milestoneGroup.isPresent()){
//                            if (gitFolder == null ||gitFolder.isEmpty()){
//                                milestoneGroup.get().setStatus(false);
//                            }else {
//                                milestoneGroup.get().setStatus(checkSubmission(gitFolder, milestone));
//                                milestoneGroupRepository.save(milestoneGroup.get());
//                            }
//                        }
                    }
                }
            }
        }
        Optional<Semester_Milestone> semesterMilestone = semesterMilestoneRepository.findLatestSemesterMilestoneAndDifferentCron(cron.toLocalDateTime());
        semesterMilestone.ifPresent(semester_milestone -> scheduleConfig.setUpdateStatusMilestoneCron(getCronExpressionFromOffsetDateTime(semester_milestone.getEndDate())));
    }

    @Override
    public List<SemesterMilestone2DTO> getMilestoneGuidancePhase(Long semester_id) {
        Semester semester = semesterRepository.findById(semester_id).orElseThrow();
        List<Semester_Milestone> semesterMilestones = semesterMilestoneRepository.findAllBySemester(semester);
        List<Semester_Milestone> filteredMilestones = semesterMilestones.stream()
                .filter(s -> s.getMilestone().getParent() != null && s.getMilestone().getParent() == 5)
                .collect(Collectors.toList());

        List<SemesterMilestone2DTO> semesterMilestone2DTOS = filteredMilestones.stream()
                .map(s -> modelMapper.map(s, SemesterMilestone2DTO.class))
                .collect(Collectors.toList());
        return semesterMilestone2DTOS;
    }

    @Override
    public ResponseEntity<String> getProcessOfMilestone(int milestoneId, int groupId) {
        List<Milestone> milestones = milestoneRepository.findAllByParent(milestoneId);
        if (milestones.isEmpty()){
            return ResponseEntity.ok("0/0");
        }else{
            List<Milestone> submissions = getTotalSubmissionByRootMilestone(milestoneId);
            int total = submissions.size();
            int process = 0;
            for (Milestone milestone : submissions){
                Optional<MilestoneGroup> milestoneGroup = milestoneGroupRepository.findByGroupIdAndMilestoneId(groupId, milestoneId);
                if (milestoneGroup.isPresent() && milestoneGroup.get().isStatus()){
                    process++;
                }
            }
            return ResponseEntity.ok(process+ "/" + total);
        }
    }
    public List<Milestone> getTotalSubmissionByRootMilestone(int id){
        List<Milestone> milestones = milestoneRepository.findAllByParent(id);
        List<Milestone> result = new ArrayList<>();
        for (Milestone m : milestones){
            if (m.parent == null){
                result.add(m);
            }else {
                result.addAll(getTotalSubmissionByRootMilestone(Integer.parseInt(m.getParent().toString())));
            }
        }
        return result;
    }

    public static List<GitFolder> getObjectByCallApiToGit(String hrefGit) throws ServiceException {
        try {
            RestTemplate restTemplate = new RestTemplate();

            // Thiết lập header
            HttpHeaders headers = new HttpHeaders();
            // Tạo httpEntity
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(headers);
            ParameterizedTypeReference<List<GitFolder>> typeRef = new ParameterizedTypeReference<List<GitFolder>>() {
            };
            ResponseEntity<List<GitFolder>> response = restTemplate.exchange(
                    hrefGit,
                    HttpMethod.GET,
                    entity,
                    typeRef
            );
            return response.getBody();
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            // Xử lý trường hợp API không tồn tại hoặc trả về lỗi
//            throw new ServiceException(ErrorCode.GITLAB_IS_INCORRECT_FORMAT);
            return null;
        } catch (Exception e) {
            // Xử lý các ngoại lệ khác
//            throw new ServiceException(ErrorCode.GITLAB_IS_INCORRECT_FORMAT);
            return null;
        }
    }
    private boolean checkSubmission(List<GitFolder> gitFolders, Milestone milestone){
        String strCheck = sanitizeFileName(milestone.getProduct()).toLowerCase();
        for (GitFolder g : gitFolders){
            if (g.getName().toLowerCase().contains(strCheck) && g.getType().equals("blob")){
                return true;
            }
        }
        return false;
    }
    public static String sanitizeFileName(String fileName) {
        // Thay thế khoảng trắng bằng dấu gạch dưới
        fileName = fileName.replace(" ", "_");

        // Chuyển đổi chữ hoa sang chữ thường
        fileName = fileName.toLowerCase();


        // Loại bỏ các ký tự đặc biệt
        fileName = fileName.replaceAll("[/\\\\:*?\"<>|]", "_");

        // Thay thế các ký tự không được hỗ trợ bằng dấu gạch dưới
        fileName = fileName.replaceAll("[^a-zA-Z0-9_.-]", "_");

        return fileName;
    }

//    private boolean checkSubmissionFolder(List<GitFolder> gitFolders, String pathRoot) throws ServiceException {
//        List<GitFolder> sample = new ArrayList<>(gitFolders);
//        for (GitFolder g : sample) {
//            if (g.getName().contains(".gitkeep")) {
//                gitFolders.remove(g);
//            }
//        }
//        if (gitFolders.isEmpty()) {
//            return false;
//        }
//        List<String> listPath = new ArrayList<>();
//        for (GitFolder g : gitFolders) {
//            if (g.getType().equals("blob")) {
//                return true;
//            } else {
//                String path = pathRoot + "/" + g.getPath();
//                listPath.add(path);
//            }
//        }
//        for (String str : listPath) {
//            return checkSubmissionFolder(getObjectByCallApiToGit(str), str);
//        }
//
//        return false;
//    }

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
    private OffsetDateTime getOffsetDateTimeFromCronExpression(String cronExpression) {
        String[] parts = cronExpression.split(" ");
        if (parts.length != 6) {
            throw new IllegalArgumentException("Invalid cron expression format");
        }

        int second = Integer.parseInt(parts[0]);
        int minute = Integer.parseInt(parts[1]);
        int hour = Integer.parseInt(parts[2]);
        int dayOfMonth = Integer.parseInt(parts[3]);
        int month = Integer.parseInt(parts[4]);
        int year = LocalDateTime.now().getYear(); // Assuming the current year

        LocalDateTime localDateTime = LocalDateTime.of(year, month, dayOfMonth, hour, minute, second);
        return localDateTime.atOffset(ZoneOffset.UTC);
    }

}
