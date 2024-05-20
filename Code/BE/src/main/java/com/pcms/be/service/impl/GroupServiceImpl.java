package com.pcms.be.service.impl;

import com.pcms.be.domain.user.Group;
import com.pcms.be.domain.user.Member;
import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.CreateGroupDTO;
import com.pcms.be.pojo.TokenDTO;
import com.pcms.be.repository.GroupRepository;
import com.pcms.be.repository.MemberRepository;
import com.pcms.be.repository.UserRepository;
import com.pcms.be.service.GroupService;
import com.pcms.be.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class GroupServiceImpl implements GroupService {
    private final GroupRepository groupRepository;
    private final UserService userService;
    private final MemberRepository memberRepository;
    private final UserRepository userRepository;

    @Autowired
    ConfigurableApplicationContext applicationContext;

    public Keycloak keycloak() {
        return applicationContext.getBean(Keycloak.class);
    }

    @Override
    @Transactional
    public Group createGroup(CreateGroupDTO createGroupDTO) throws ServiceException {
        try {
            List<Group> allGroups = groupRepository.findAll();
            for (Group g : allGroups) {
                if (g.getOwner().getId() == userService.getCurrentUser().getId()) {
//                    throw new ServiceException("Current user already owns a group.");
                    throw new ServiceException(ErrorCode.USER_ALREADY_IN_A_GROUP);
                }
            }
            List<Member> allMembers = memberRepository.findAll();
            for (Member m : allMembers) {
                if (m.getUser().getId() == userService.getCurrentUser().getId() && m.getUser().status == true) {
                    throw new ServiceException("Current user already in a group.");
                }
            }
            if (createGroupDTO.getListUserID().stream().count() > 4) {
                throw new ServiceException("Maximum of a group is 5 member.");
            }
            Group group = createGroupInternal(createGroupDTO, userService.getCurrentUser());
            Member ownerGroup = new Member();
            ownerGroup.setRole(Member.MemberRole.OWNER);
            ownerGroup.setStatus(true);
            ownerGroup.setUser(userService.getCurrentUser());
            ownerGroup.setGroup(group);
            memberRepository.save(ownerGroup);
            for (Integer memberId : createGroupDTO.getListUserID()) {
                if ((Long.valueOf(memberId)) == userService.getCurrentUser().getId() && !(memberRepository.findByIdAndStatus(memberId, true) != null)) {
                    throw new ServiceException("Failed to create group.");
                }
                createMember(group, memberId);
            }
            return group;
        } catch (Exception e) {
            throw new ServiceException("Failed to create group.", e);
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
