package com.pcms.be.service.impl;

import com.pcms.be.domain.user.Group;
import com.pcms.be.domain.user.Member;
import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.CreateGroupDTO;
import com.pcms.be.pojo.GroupDTO;
import com.pcms.be.pojo.TokenDTO;
import com.pcms.be.pojo.UserDTO;
import com.pcms.be.repository.GroupRepository;
import com.pcms.be.repository.MemberRepository;
import com.pcms.be.repository.UserRepository;
import com.pcms.be.service.GroupService;
import com.pcms.be.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Slf4j
public class GroupServiceImpl implements GroupService {
    private final GroupRepository groupRepository;
    private final UserService userService;
    private final MemberRepository memberRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Autowired
    ConfigurableApplicationContext applicationContext;

    public Keycloak keycloak() {
        return applicationContext.getBean(Keycloak.class);
    }

    @Override
    @Transactional
    public GroupDTO createGroup(CreateGroupDTO createGroupDTO) throws ServiceException {
        try {
            User currentUser = userService.getCurrentUser();
            if (groupRepository.findByOwnerId(currentUser.getId()) != null) {
                throw new ServiceException(ErrorCode.USER_ALREADY_IN_A_GROUP);
            }
            if (memberRepository.findByUserIdAndStatusTrue(currentUser.getId()) != null) {
                throw new ServiceException(ErrorCode.USER_ALREADY_IN_A_GROUP);
            }

            if (createGroupDTO.getListUserID().stream().count() > 4) {
                throw new ServiceException(ErrorCode.MAXIMUM_SIZE_OF_A_GROUP);
            }
            Group group = createGroupInternal(createGroupDTO, userService.getCurrentUser());
            Member ownerGroup = new Member();
            ownerGroup.setRole(Member.MemberRole.OWNER);
            ownerGroup.setStatus(true);
            ownerGroup.setUser(userService.getCurrentUser());
            ownerGroup.setGroup(group);
            memberRepository.save(ownerGroup);
            for (Integer memberId : createGroupDTO.getListUserID()) {
                if (userRepository.findUserById(memberId) == null) {
                    throw new ServiceException(ErrorCode.USER_NOT_FOUND);
                }
                if ((Long.valueOf(memberId)) == userService.getCurrentUser().getId() || memberRepository.findByUserIdAndStatusTrue(Long.valueOf(memberId)) != null) {
                    throw new ServiceException(ErrorCode.USER_ALREADY_IN_A_GROUP);
                }
                createMember(group, memberId);
            }
            GroupDTO groupDTO = modelMapper.map(group, GroupDTO.class);
            return groupDTO;
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.FAILED_CREATE_GROUP);
        }
    }

    private Group createGroupInternal(CreateGroupDTO createGroupDTO, User owner) {
        Group group = new Group();
        group.setAbbreviations(createGroupDTO.getAbbreviations());
        group.setDescription(createGroupDTO.getDescription());
        group.setKeywords(createGroupDTO.getKeywords());
        group.setName(createGroupDTO.getName());
        group.setVietnameseTitle(createGroupDTO.getVietnameseTitle());
        group.setOwner(owner);
        return groupRepository.save(group);
    }

    private void createMember(Group group, Integer memberId) {
        Member newInviteMember = new Member();
        newInviteMember.setRole(Member.MemberRole.MEMBER);
        newInviteMember.setStatus(false);
        newInviteMember.setUser(userRepository.findById(Long.valueOf(memberId)).orElse(null));
        newInviteMember.setGroup(group);
        memberRepository.save(newInviteMember);
    }
}
