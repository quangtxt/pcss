package com.pcms.be.service.impl;

import com.pcms.be.domain.user.GroupMentor;
import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.functions.Constants;
import com.pcms.be.pojo.response.GroupMentorResponse;
import com.pcms.be.repository.GroupMentorRepository;
import com.pcms.be.service.GroupMentorService;
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
public class GroupMetorImpl implements GroupMentorService {
    private final GroupMentorRepository groupMentorRepository;
    private final UserService userService;
    private final ModelMapper modelMapper;
    @Override
    public List<GroupMentorResponse> getListInvitationByStatus(String status) throws ServiceException {
        if(status.equals(Constants.MentorStatus.PENDING_MENTOR)){
            User currentUser = userService.getCurrentUser();
            List<GroupMentor> listInvitation = groupMentorRepository.findByMentorIdAndStatus(currentUser.getMentor(), status);
            List<GroupMentorResponse> groupMentorRespons = new ArrayList<>();
            for (GroupMentor groupMentor : listInvitation
            ) {
                groupMentorRespons.add(modelMapper.map(groupMentor, GroupMentorResponse.class));
            }
            return groupMentorRespons;
        }else if(status.equals(Constants.MentorStatus.PENDING_LEADER_TEACHER)){
            List<GroupMentor> listInvitation = groupMentorRepository.findAllByStatus(status);
            List<GroupMentorResponse> groupMentorRespons = new ArrayList<>();
            for (GroupMentor groupMentor : listInvitation
            ) {
                groupMentorRespons.add(modelMapper.map(groupMentor, GroupMentorResponse.class));
            }
            return groupMentorRespons;
        }
        return null;
    }

    @Override
    public GroupMentor putStatus(Long id, String newStatus) throws ServiceException {
        Optional<GroupMentor> optionalInvitation = groupMentorRepository.findById(id);
        if(optionalInvitation.isPresent()){
            GroupMentor invitation = optionalInvitation.get();
            invitation.setStatus(newStatus);
            return groupMentorRepository.save(invitation);
        }else {
            throw new ServiceException(ErrorCode.FAILED_EDIT_GROUP);
        }
    }
}
