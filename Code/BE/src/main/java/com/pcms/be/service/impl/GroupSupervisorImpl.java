package com.pcms.be.service.impl;

import com.pcms.be.domain.user.GroupSupervisor;
import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.functions.Constants;
import com.pcms.be.pojo.response.GroupSupervisorResponse;
import com.pcms.be.repository.GroupSupervisorRepository;
import com.pcms.be.service.GroupSupervisorService;
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
public class GroupSupervisorImpl implements GroupSupervisorService {
    private final GroupSupervisorRepository groupSupervisorRepository;
    private final UserService userService;
    private final ModelMapper modelMapper;
    @Override
    public List<GroupSupervisorResponse> getByStatus(String status) throws ServiceException {
        if(status.equals(Constants.SupervisorStatus.PENDING_SUPERVISOR)){
            User currentUser = userService.getCurrentUser();
            List<GroupSupervisor> listInvitation = groupSupervisorRepository.findBySupervisorAndStatus(currentUser.getSupervisor(), status);
            List<GroupSupervisorResponse> groupSupervisorResponse = new ArrayList<>();
            for (GroupSupervisor groupSupervisor : listInvitation
            ) {
                groupSupervisorResponse.add(modelMapper.map(groupSupervisor, GroupSupervisorResponse.class));
            }
            return groupSupervisorResponse;
        }else if(status.equals(Constants.SupervisorStatus.PENDING_LEADER_TEACHER)){
            List<GroupSupervisor> listInvitation = groupSupervisorRepository.findAllByStatus(status);
            List<GroupSupervisorResponse> groupSupervisorResponse = new ArrayList<>();
            for (GroupSupervisor groupSupervisor : listInvitation
            ) {
                groupSupervisorResponse.add(modelMapper.map(groupSupervisor, GroupSupervisorResponse.class));
            }
            return groupSupervisorResponse;
        }else if(status.equals(Constants.SupervisorStatus.ACCEPT_SUPERVISOR)){
            List<GroupSupervisor> listInvitation = groupSupervisorRepository.findAllByStatus(status);
            List<GroupSupervisorResponse> groupSupervisorResponse = new ArrayList<>();
            for (GroupSupervisor groupSupervisor : listInvitation
            ) {
                groupSupervisorResponse.add(modelMapper.map(groupSupervisor, GroupSupervisorResponse.class));
            }
            return groupSupervisorResponse;
        }
        return null;
    }

    @Override
    public GroupSupervisor putStatus(Long id, String newStatus) throws ServiceException {
        Optional<GroupSupervisor> optionalInvitation = groupSupervisorRepository.findById(id);
        if(optionalInvitation.isPresent()){
            GroupSupervisor invitation = optionalInvitation.get();
            invitation.setStatus(newStatus);
            return groupSupervisorRepository.save(invitation);
        }else {
            throw new ServiceException(ErrorCode.FAILED_EDIT_GROUP);
        }
    }

    @Override
    public List<GroupSupervisorResponse> getGroupBySemester(int semesterId) throws ServiceException {
        User currentUser = userService.getCurrentUser();
        List<GroupSupervisor> groupSupervisors = groupSupervisorRepository.findBySupervisorAndStatus(currentUser.getSupervisor(),Constants.SupervisorStatus.ACCEPT_SUPERVISOR);
       if(groupSupervisors.size()==0) {
           throw new ServiceException(ErrorCode.NOT_FOUND);
       }
        List<GroupSupervisorResponse> groupSupervisorResponse = new ArrayList<>();
        for (GroupSupervisor groupSupervisor : groupSupervisors
        ) {
            if(groupSupervisor.getGroup().getSemester().getId()==semesterId) {
                groupSupervisorResponse.add(modelMapper.map(groupSupervisor, GroupSupervisorResponse.class));
            }
        }
        return groupSupervisorResponse;
    }
}
