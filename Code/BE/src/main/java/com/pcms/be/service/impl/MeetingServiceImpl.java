package com.pcms.be.service.impl;

import com.pcms.be.domain.meeting.Meeting;
import com.pcms.be.domain.user.*;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.functions.Constants;
import com.pcms.be.functions.NotificationTemplate;
import com.pcms.be.pojo.DTO.MeetingDTO;
import com.pcms.be.pojo.request.CreateMeetingRequest;
import com.pcms.be.pojo.request.EditMeetingRequest;
import com.pcms.be.repository.GroupSupervisorRepository;
import com.pcms.be.repository.GroupRepository;
import com.pcms.be.repository.MeetingRepository;
import com.pcms.be.service.MeetingService;
import com.pcms.be.service.NotificationService;
import com.pcms.be.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MeetingServiceImpl implements MeetingService {
    private final GroupRepository groupRepository;
    private final GroupSupervisorRepository groupSupervisorRepository;
    private final MeetingRepository meetingRepository;
    private final UserService userService;
    private final ModelMapper modelMapper;
    private final NotificationService notificationService;

    @Override
    @Transactional
    public List<MeetingDTO> createMeeting(List<CreateMeetingRequest> createMeetingRequests) throws ServiceException {
        try {
            List<MeetingDTO> meetingDTOS = new ArrayList<>();
            OffsetDateTime currentTime = OffsetDateTime.now();
            // Kiểm tra thời gian không được trùng nhau trong cùng 1 list request
            for (int i = 0; i < createMeetingRequests.size(); i++) {
                for (int j = i + 1; j < createMeetingRequests.size(); j++) {
                    if (areMeetingTimesOverlapping(createMeetingRequests.get(i), createMeetingRequests.get(j))) {
                        throw new ServiceException(ErrorCode.TIME_RANGE_DUPLICATED);
                    }
                }
            }
            List<Meeting> existingMeetings = meetingRepository.findAll();
            // Kiểm tra xem thời gian của meeting request có trùng với thời gian của meeting đã có trong database hay không
            for (CreateMeetingRequest meet : createMeetingRequests) {
                for (Meeting existingMeeting : existingMeetings) {
                    if (areMeetingTimesOverlapping(meet, existingMeeting)) {
                        throw new ServiceException(ErrorCode.TIME_RANGE_DUPLICATED);
                    }
                }
            }
            for (CreateMeetingRequest meet : createMeetingRequests) {
                Optional<Group> group = groupRepository.findById(Long.valueOf(meet.getGroupId()));
                if (!group.isPresent()) {
                    throw new ServiceException(ErrorCode.GROUP_NOT_FOUND);
                }
                Group group1 = group.get();
                User user = userService.getCurrentUser();
                GroupSupervisor groupSupervisor = groupSupervisorRepository.findByGroupAndSupervisorAndStatus(group1, user.getSupervisor(), "ACCEPT_SUPERVISOR");
                if (groupSupervisor == null) {
                    throw new ServiceException(ErrorCode.USER_NOT_ALLOW);
                }

                // Kiểm tra createAt phải trước endAt
                if (meet.getStartAt().isAfter(meet.getEndAt())) {
                    throw new ServiceException(ErrorCode.STARTAT_MUST_BE_BEFORE_ENDAT);
                }
                // Kiểm tra createAt phải sau currentTime
                if (meet.getStartAt().isBefore(currentTime)) {
                    throw new ServiceException(ErrorCode.STARTAT_MUST_BE_AFTER_CURRENT_TIME);
                }

                Meeting newMeeting = new Meeting();
                newMeeting.setStartAt(meet.getStartAt());
                newMeeting.setEndAt(meet.getEndAt());
                newMeeting.setType(meet.getType());
                newMeeting.setLocation(meet.getLocation());
                newMeeting.setGroup(group1);
                newMeeting.setStatus(Constants.MeetingStatus.PENDING);
                meetingRepository.save(newMeeting);
                meetingDTOS.add(modelMapper.map(newMeeting, MeetingDTO.class));
                List<User> users = new ArrayList<>();
                for (Member m: group1.getMembers()){
                    users.add(m.getStudent().getUser());
                }
                //Tạo notification
                Map<String, String> map = new HashMap<>();
                //Bạn có một cuộc họp với supervisor: _SupervisorName-txt_ vào lúc _Time-txt_.\n" +
                //                "Link Meeting: _Location-txt_
                map.put("_SupervisorName-txt_", group1.getSupervisors().stream().map(Supervisor::getUser).map(User::getName).collect(Collectors.joining(". ")));
                map.put("_Time-txt_", String.valueOf(meet.getStartAt().getHour())+":"+String.valueOf(meet.getStartAt().getMinute()+" "+ meet.getStartAt().getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.forLanguageTag("vi")))
                +" " + meet.getStartAt().getDayOfMonth() + "/" + meet.getStartAt().getMonth()+"/"+meet.getStartAt().getYear());
                map.put("_Location-txt_", meet.getLocation());
                String content = notificationService.createContentNotification(NotificationTemplate.MeetingNotification.createMeetingTemplate, map);
                for (User u : users){
                    notificationService.saveNotification(u, content);
                }
            }
            return meetingDTOS;
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.FAILED_CREATE_MEETING);
        }
    }

    @Override
    public List<MeetingDTO> viewMeetings(int groupId) throws ServiceException {
        try {
            Optional<Group> group = groupRepository.findById(Long.valueOf(groupId));
            if (!group.isPresent()) {
                throw new ServiceException(ErrorCode.GROUP_NOT_FOUND);
            }
            Group group1 = group.get();
            List<Meeting> meetings = meetingRepository.findAllByGroup(group1);
            List<MeetingDTO> meetingDTOs = new ArrayList<>();
            for (Meeting meet : meetings) {
                meetingDTOs.add(modelMapper.map(meet, MeetingDTO.class));
            }
            return meetingDTOs;
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.FAILED_CREATE_GROUP);
        }
    }

    @Override
    public List<MeetingDTO> updateMeeting(List<EditMeetingRequest> editMeetingRequests) throws ServiceException {
        try {
            List<MeetingDTO> meetingDTOS = new ArrayList<>();
            OffsetDateTime currentTime = OffsetDateTime.now();
            // Kiểm tra thời gian không được trùng nhau trong cùng 1 list request
            for (int i = 0; i < editMeetingRequests.size(); i++) {
                for (int j = i + 1; j < editMeetingRequests.size(); j++) {
                    if (areMeetingTimesOverlapping(editMeetingRequests.get(i), editMeetingRequests.get(j))) {
                        throw new ServiceException(ErrorCode.TIME_RANGE_DUPLICATED);
                    }
                }
            }
            List<Meeting> existingMeetings = meetingRepository.findAll();
            // Kiểm tra xem thời gian của meeting request có trùng với thời gian của meeting đã có trong database hay không
            for (EditMeetingRequest meet : editMeetingRequests) {
                for (Meeting existingMeeting : existingMeetings) {
                    if (areMeetingTimesOverlapping(meet, existingMeeting)) {
                        throw new ServiceException(ErrorCode.TIME_RANGE_DUPLICATED);
                    }
                }
            }

            for (EditMeetingRequest meet : editMeetingRequests) {
                Optional<Meeting> meeting = meetingRepository.findById(Long.valueOf(meet.getId()));
                if (!meeting.isPresent()) {
                    throw new ServiceException(ErrorCode.NOT_FOUND);
                }
                User user = userService.getCurrentUser();
                GroupSupervisor groupSupervisor = groupSupervisorRepository.findByGroupAndSupervisorAndStatus(meeting.get().getGroup(), user.getSupervisor(), "ACCEPT_SUPERVISOR");
                if (groupSupervisor == null) {
                    throw new ServiceException(ErrorCode.USER_NOT_ALLOW);
                }
                if(!meeting.get().getStatus().equals(Constants.MeetingStatus.PENDING)){
                    throw new ServiceException(ErrorCode.FAILED_EDIT_MEETING);
                }
                // Kiểm tra createAt phải trước endAt
                if (meet.getStartAt().isAfter(meet.getEndAt())) {
                    throw new ServiceException(ErrorCode.STARTAT_MUST_BE_BEFORE_ENDAT);
                }
                // Kiểm tra createAt phải sau currentTime
                if (meet.getStartAt().isBefore(currentTime)) {
                    throw new ServiceException(ErrorCode.STARTAT_MUST_BE_AFTER_CURRENT_TIME);
                }

                Meeting editMeeting = meeting.get();
                OffsetDateTime oldTime = editMeeting.getStartAt();
                editMeeting.setStartAt(meet.getStartAt());
                editMeeting.setEndAt(meet.getEndAt());
                editMeeting.setType(meet.getType());
                editMeeting.setLocation(meet.getLocation());
                meetingRepository.save(editMeeting);
                meetingDTOS.add(modelMapper.map(editMeeting, MeetingDTO.class));
                Map<String, String> map = new HashMap<>();
                //Bạn có một cuộc họp với supervisor: _SupervisorName-txt_ vào lúc _Time-txt_.\n" +
                //                "Link Meeting: _Location-txt_
                map.put("_OldTime-txt_",String.valueOf(oldTime.getHour())+":"+String.valueOf(oldTime.getMinute()+" "+ oldTime.getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.forLanguageTag("vi")))
                        +" " + meet.getStartAt().getDayOfMonth() + "/" + meet.getStartAt().getMonth()+"/"+meet.getStartAt().getYear());
                map.put("_SupervisorName-txt_", meeting.get().getGroup().getSupervisors().stream().map(Supervisor::getUser).map(User::getName).collect(Collectors.joining(". ")));
                map.put("_Time-txt_", String.valueOf(meet.getStartAt().getHour())+":"+String.valueOf(meet.getStartAt().getMinute()+" "+ meet.getStartAt().getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.forLanguageTag("vi")))
                        +" " + meet.getStartAt().getDayOfMonth() + "/" + meet.getStartAt().getMonth()+"/"+meet.getStartAt().getYear());
                map.put("_Location-txt_", meet.getLocation());
                String content = notificationService.createContentNotification(NotificationTemplate.MeetingNotification.updateMeetingTemplate, map);
                for (Member m : meeting.get().getGroup().getMembers()){
                    notificationService.saveNotification(m.getStudent().getUser(), content);
                }
            }
            return meetingDTOS;
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.FAILED_EDIT_MEETING);
        }
    }

    @Override
    public MeetingDTO removeMeeting(int meetingId) throws ServiceException {
        try {
            Optional<Meeting> meeting = meetingRepository.findById(Long.valueOf(meetingId));
            if (!meeting.isPresent()) {
                throw new ServiceException(ErrorCode.NOT_FOUND);
            }
            if(!meeting.get().getStatus().equals(Constants.MeetingStatus.PENDING)){
                throw new ServiceException(ErrorCode.USER_NOT_ALLOW);
            }
            User user = userService.getCurrentUser();
            GroupSupervisor groupSupervisor = groupSupervisorRepository.findByGroupAndSupervisorAndStatus(meeting.get().getGroup(), user.getSupervisor(), "ACCEPT_SUPERVISOR");
            if (groupSupervisor == null) {
                throw new ServiceException(ErrorCode.USER_NOT_ALLOW);
            }
            Map<String, String> map = new HashMap<>();
            map.put("_Time-txt_", String.valueOf(meeting.get().getStartAt().getHour())+":"+String.valueOf(meeting.get().getStartAt().getMinute()+" "+ meeting.get().getStartAt().getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.forLanguageTag("vi")))
                    +" " + meeting.get().getStartAt().getDayOfMonth() + "/" + meeting.get().getStartAt().getMonth()+"/"+meeting.get().getStartAt().getYear());
            String content = notificationService.createContentNotification(NotificationTemplate.MeetingNotification.deleteMeetingTemplate, map);
            for (Member m : meeting.get().getGroup().getMembers()){
                notificationService.saveNotification(m.getStudent().getUser(), content);
            }
            meetingRepository.delete(meeting.get());
            return modelMapper.map(meeting.get(), MeetingDTO.class);
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.FAILED_DELETE_MEETING);
        }
    }

    @Override
    public ResponseEntity<MeetingDTO> getByMeetingId(int meetingId) throws ServiceException {
        try {
            Optional<Meeting> meeting = meetingRepository.findById(Long.valueOf(meetingId));
            if (meeting.isEmpty()){
                throw new ServiceException(ErrorCode.MEETING_NOT_FOUND);
            }else{
                MeetingDTO meetingDTO = modelMapper.map(meeting.get(), MeetingDTO.class);
                return ResponseEntity.ok(meetingDTO);
            }
        }catch (Exception e) {
            throw new ServiceException(ErrorCode.MEETING_NOT_FOUND);
        }
    }

    private boolean areMeetingTimesOverlapping(CreateMeetingRequest createMeetingRequest, Meeting existingMeeting) {
        // Kiểm tra xem thời gian của meeting request có trùng với thời gian của meeting đã có trong database hay không
        return (createMeetingRequest.getStartAt().isBefore(existingMeeting.getEndAt()) && createMeetingRequest.getEndAt().isAfter(existingMeeting.getStartAt()));
    }

    private boolean areMeetingTimesOverlapping(EditMeetingRequest createMeetingRequest, Meeting existingMeeting) {
        // Kiểm tra xem thời gian của meeting request có trùng với thời gian của meeting đã có trong database hay không
        return (createMeetingRequest.getStartAt().isBefore(existingMeeting.getEndAt()) && createMeetingRequest.getEndAt().isAfter(existingMeeting.getStartAt()));
    }

    private boolean areMeetingTimesOverlapping(CreateMeetingRequest meeting1, CreateMeetingRequest meeting2) {
        //kiểm tra xem thời gian của meeting request không được đè lên thời gian của nhau
        return (meeting1.getStartAt().isBefore(meeting2.getEndAt()) && meeting2.getStartAt().isBefore(meeting1.getEndAt()));
    }

    private boolean areMeetingTimesOverlapping(EditMeetingRequest meeting1, EditMeetingRequest meeting2) {
        //kiểm tra xem thời gian của meeting request không được đè lên thời gian của nhau
        return (meeting1.getStartAt().isBefore(meeting2.getEndAt()) && meeting2.getStartAt().isBefore(meeting1.getEndAt()));
    }
}