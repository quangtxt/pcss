package com.pcms.be.service.impl;

import com.pcms.be.domain.user.Group;
import com.pcms.be.domain.user.Member;
import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.functions.Constants;
import com.pcms.be.pojo.request.CreateGroupRequest;
import com.pcms.be.pojo.request.EditGroupRequest;
import com.pcms.be.pojo.response.GroupResponse;
import com.pcms.be.repository.GroupRepository;
import com.pcms.be.repository.MemberRepository;
import com.pcms.be.repository.StudentRepository;
import com.pcms.be.repository.UserRepository;
import com.pcms.be.service.GroupService;
import com.pcms.be.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Slf4j
public class GroupServiceImpl implements GroupService {
    private final GroupRepository groupRepository;
    private final UserService userService;
    private final MemberRepository memberRepository;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final ModelMapper modelMapper;


    @Override
    @Transactional
    public GroupResponse createGroup(CreateGroupRequest createGroupDTO) throws ServiceException {
        try {
            User currentUser = userService.getCurrentUser();
            if (groupRepository.findByOwnerId(currentUser.getStudent().getId()) != null) {
                throw new ServiceException(ErrorCode.STUDENT_ALREADY_IN_A_GROUP);
            }
            if (memberRepository.findByStudentIdAndStatus(currentUser.getStudent().getId(), Constants.MemberStatus.INGROUP) != null) {
                throw new ServiceException(ErrorCode.STUDENT_ALREADY_IN_A_GROUP);
            }
            if (createGroupDTO.getListStudentID().stream().count() > 4) {
                throw new ServiceException(ErrorCode.MAXIMUM_SIZE_OF_A_GROUP);
            }
            Group group = createGroupInternal(createGroupDTO, userService.getCurrentUser());
            Member ownerGroup = new Member();
            ownerGroup.setRole(Constants.MemberRole.OWNER);
            ownerGroup.setStatus(Constants.MemberStatus.INGROUP);
            ownerGroup.setStudent(userService.getCurrentUser().getStudent());
            ownerGroup.setGroup(group);
            memberRepository.save(ownerGroup);
            for (Integer studentId : createGroupDTO.getListStudentID()) {
                if (studentRepository.findById(Long.valueOf(studentId)) == null) {
                    throw new ServiceException(ErrorCode.STUDENT_NOT_FOUND);
                }
                if ((Long.valueOf(studentId)) == userService.getCurrentUser().getStudent().getId()
                        || memberRepository.findByStudentIdAndStatus(Long.valueOf(studentId), Constants.MemberStatus.INGROUP) != null) {
                    throw new ServiceException(ErrorCode.STUDENT_ALREADY_IN_A_GROUP);
                }
                inviteMember(group, studentId);
            }
            GroupResponse groupResponse = modelMapper.map(group, GroupResponse.class);
            return groupResponse;
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.FAILED_CREATE_GROUP);
        }
    }

    private Group createGroupInternal(CreateGroupRequest createGroupDTO, User owner) {
        Group group = new Group();
        group.setAbbreviations(createGroupDTO.getAbbreviations());
        group.setDescription(createGroupDTO.getDescription());
        group.setKeywords(createGroupDTO.getKeywords());
        group.setName(createGroupDTO.getName());
        group.setVietnameseTitle(createGroupDTO.getVietnameseTitle());
        group.setOwner(owner.getStudent());
        group.setStatus(Constants.GroupStatus.PENDING);
        return groupRepository.save(group);
    }

    private void inviteMember(Group group, Integer studentId) {
        Member newInviteMember = new Member();
        newInviteMember.setRole(Constants.MemberRole.MEMBER);
        newInviteMember.setStatus(Constants.MemberStatus.PENDING);
        newInviteMember.setStudent(studentRepository.findById(Long.valueOf(studentId)).orElse(null));
        newInviteMember.setGroup(group);
        memberRepository.save(newInviteMember);
    }

    @Override
    public GroupResponse editGroup(EditGroupRequest editGroupDTO) throws ServiceException {
        try {

            Group group = groupRepository.findByOwnerId(userService.getCurrentUser().getStudent().getId());
            if (!group.getStatus().equals(Constants.GroupStatus.PENDING)) {
                throw new ServiceException(ErrorCode.FAILED_EDIT_GROUP);
            }
            if (group != null) {
                group.setAbbreviations(editGroupDTO.getAbbreviations());
                group.setDescription(editGroupDTO.getDescription());
                group.setKeywords(editGroupDTO.getKeywords());
                group.setName(editGroupDTO.getName());
                group.setVietnameseTitle(editGroupDTO.getVietnameseTitle());
                groupRepository.save(group);
                GroupResponse groupResponse = modelMapper.map(group, GroupResponse.class);
                return groupResponse;
            } else {
                throw new ServiceException(ErrorCode.FAILED_EDIT_GROUP);
            }

        } catch (Exception e) {
            throw new ServiceException(ErrorCode.FAILED_EDIT_GROUP);
        }
    }

    @Override
    public List<Group> getGroupsById(List<Long> groupId) throws ServiceException {
        return groupRepository.findAllById(groupId);
    }

    @Override
    public GroupResponse getGroupById(int groupId) throws ServiceException {
        try {
            Optional<Group> group = groupRepository.findById(Long.valueOf(groupId));
            if (group.isPresent()) {
                Group group1 = group.get();
                GroupResponse groupResponse = modelMapper.map(group1, GroupResponse.class);
                return groupResponse;
            }
            return null;
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.FAILED_EDIT_GROUP);
        }
    }

}
