package com.pcms.be.service.impl;

import com.pcms.be.domain.meeting.Meeting;
import com.pcms.be.domain.user.Group;
import com.pcms.be.domain.user.GroupMentor;
import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.functions.Constants;
import com.pcms.be.pojo.DTO.MeetingDTO;
import com.pcms.be.pojo.request.CreateMeetingRequest;
import com.pcms.be.pojo.request.EditMeetingRequest;
import com.pcms.be.repository.GroupMentorRepository;
import com.pcms.be.repository.GroupRepository;
import com.pcms.be.repository.MeetingRepository;
import com.pcms.be.service.MeetingService;
import com.pcms.be.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MeetingServiceImpl implements MeetingService {
    private final GroupRepository groupRepository;
    private final GroupMentorRepository groupMentorRepository;
    private final MeetingRepository meetingRepository;
    private final UserService userService;
    private final ModelMapper modelMapper;

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
                GroupMentor groupMentor = groupMentorRepository.findByGroupAndMentorAndStatus(group1, user.getMentor(), "ACCEPT_MENTOR");
                if (groupMentor == null) {
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
                GroupMentor groupMentor = groupMentorRepository.findByGroupAndMentorAndStatus(meeting.get().getGroup(), user.getMentor(), "ACCEPT_MENTOR");
                if (groupMentor == null) {
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
                editMeeting.setStartAt(meet.getStartAt());
                editMeeting.setEndAt(meet.getEndAt());
                editMeeting.setType(meet.getType());
                editMeeting.setLocation(meet.getLocation());
                meetingRepository.save(editMeeting);
                meetingDTOS.add(modelMapper.map(editMeeting, MeetingDTO.class));
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
            GroupMentor groupMentor = groupMentorRepository.findByGroupAndMentorAndStatus(meeting.get().getGroup(), user.getMentor(), "ACCEPT_MENTOR");
            if (groupMentor == null) {
                throw new ServiceException(ErrorCode.USER_NOT_ALLOW);
            }
            meetingRepository.delete(meeting.get());
            return modelMapper.map(meeting.get(), MeetingDTO.class);
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.FAILED_DELETE_MEETING);
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