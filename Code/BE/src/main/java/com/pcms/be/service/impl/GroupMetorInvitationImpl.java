package com.pcms.be.service.impl;

import com.pcms.be.domain.user.GroupMentorInvitation;
import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.functions.Constants;
import com.pcms.be.pojo.DTO.GroupMentorInvitationDTO;
import com.pcms.be.pojo.response.GroupMentorInvitationResponse;
import com.pcms.be.repository.GroupMentorInvitationRepository;
import com.pcms.be.service.GroupMentorInvitationService;
import com.pcms.be.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class GroupMetorInvitationImpl implements GroupMentorInvitationService {
    private final GroupMentorInvitationRepository groupMentorInvitationRepository;
    private final UserService userService;
    private final ModelMapper modelMapper;
    @Override
    public List<GroupMentorInvitationResponse> getListInvitationByStatus(String status) throws ServiceException {
        if(status.equals(Constants.MentorStatus.PENDING_MENTOR)){
            User currentUser = userService.getCurrentUser();
            List<GroupMentorInvitation> listInvitation = groupMentorInvitationRepository.findByMentorIdAndStatus(currentUser.getMentor(), status);
            List<GroupMentorInvitationResponse> groupMentorInvitationResponses = new ArrayList<>();
            for (GroupMentorInvitation groupMentorInvitation: listInvitation
            ) {
                groupMentorInvitationResponses.add(modelMapper.map(groupMentorInvitation, GroupMentorInvitationResponse.class));
            }
            return groupMentorInvitationResponses;
        }else if(status.equals(Constants.MentorStatus.PENDING_LEADER_TEACHER)){
            List<GroupMentorInvitation> listInvitation = groupMentorInvitationRepository.findAllByStatus(status);
            List<GroupMentorInvitationResponse> groupMentorInvitationResponses = new ArrayList<>();
            for (GroupMentorInvitation groupMentorInvitation: listInvitation
            ) {
                groupMentorInvitationResponses.add(modelMapper.map(groupMentorInvitation, GroupMentorInvitationResponse.class));
            }
            return groupMentorInvitationResponses;
        }
        return null;
    }

    @Override
    public GroupMentorInvitation putStatus(Long id, String newStatus) throws ServiceException {
        Optional<GroupMentorInvitation> optionalInvitation = groupMentorInvitationRepository.findById(id);
        if(optionalInvitation.isPresent()){
            GroupMentorInvitation invitation = optionalInvitation.get();
            invitation.setStatus(newStatus);
            return groupMentorInvitationRepository.save(invitation);
        }else {
            throw new ServiceException(ErrorCode.FAILED_EDIT_GROUP);
        }
    }
}
